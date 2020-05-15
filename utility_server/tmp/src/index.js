'use strict';

// const server_location = 'http://softarch.usc.edu:3000/'

const io = require('socket.io-client');
// const socket = io(server_location);
const socket = io();

const alert = require('alert-node');

var Video = require('twilio-video');

const VIDEO_STREAM_WIDTH = 720;
const VIDEO_STREAM_HEIGHT = 540;


/**
 * 
 * 
 * 		Local Variables
 * 
 * 
 */

// Reference to the active room.
// This is needed in order to close the 
// connection to the room once it's disconnected.
var activeRoom;

// Identity of the local user. 
// It's hardcoded to 'tester'.
// TODO: Make this configurable.
var identity;

// The name of the room to join.
// TODO: Change hardcoded name. This is needed in order to support multiple 
// 		 devices at the same time. 
var roomName = "Broadcast";

var fileName = "some_download"

var eventArray = [];

var iosDevicePresent = false;


var recordingTimerStart;
var recorder;
var isRecordingStarted = false;
var isStoppedRecording = false;


/**
 * 
 * 
 * 		Initialization.
 * 
 * 
 */



// Obtain a token from the server in order to connect to the Room.
$.getJSON('/session', function(data){
	var deviceId = data.deviceId;
	var tester_name = data.name;

	if (deviceId == null || deviceId == "" || tester_name == null || tester_name == "") {
		console.log("Something is wrong!")
		alert("Please go back to the start page and enter name and chose device.")
		return
	}

	$.getJSON('/token?identity=' + tester_name, function(data){
		var token = data.token;
		console.log(tester_name + " is connecting to room " + roomName);
		roomName = "Room_" + deviceId;
		console.log("Connecting to the room: " + roomName)
		var connectOptions={
			name: roomName,
			logLevel: 'debug',
			tracks: []
		};
		Video.connect(token, connectOptions).then(roomJoined, function (error) {
			console.log("Could not connect to Twilio: "+ error.message);
		});
	});
});


document.getElementById('btn-start-recording').onclick = startRecordingClicked
document.getElementById('btn-stop-recording').onclick = stopRecordingClicked

/**
 * 
 * When we are about to transition away from this page, disconnect
 *  from the room, if joined.
 * 
 */
window.addEventListener('beforeunload', function () {
	if (activeRoom) {
		activeRoom.disconnect();
	}
});

/**
 * 
 * 
 * 			WebRTC Event Handlers
 * 
 * 
 */


/**
 * Successfully connected!
 *  
 * @param {*} room 
 */
function roomJoined(room) {
	window.room = activeRoom = room;

	console.log("Joined room: " + room + " as '" + identity + "'");

	// Attach the Tracks of the Room's Participants.
	// This happens only when iOS device is already sharing the screen.
	room.participants.forEach(participant => checkAndConnectParticipant(participant));

	// When a Participant joins the Room, log the event.
	// This happens when iOS app starts after you opened this page.
	room.on('participantConnected', checkAndConnectParticipant);

	// When a Participant leaves the Room, detach its Tracks.
	room.on('participantDisconnected', function (participant) {
		console.log("RemoteParticipant '" + participant.identity + "' left the room");

		if (participant.identity == "ios_device") {
			iosDevicePresent = false;
		}

		detachParticipantTracks(participant);
	});

	// Once the LocalParticipant leaves the room, detach the Tracks
	// of all Participants, including that of the LocalParticipant.
	room.on('disconnected', function () {
		console.log('Left');

		room.participants.forEach(function (participant) {
			detachParticipantTracks(participant);
		});

		activeRoom = null;
	});
}

/**
 * Check wether is allowed for the connecting participant to join the room.
 * 
 * @param {String} participant - identification of the participant connecting to the room. 
 */
function checkAndConnectParticipant(participant) {
	if (participant.identity != "ios_device") {
		console.log("Not valid participant identity: '" + participant.identity + "'");
		return;
	}

	if (iosDevicePresent) {
		console.log("IOS DEVICE ALREADY PRESENT!!!");
	}
	iosDevicePresent = true;

	// Remote media container. 
	var remoteMediaContainer = document.getElementById('remote-media');
	participantConnected(participant, remoteMediaContainer);
}


/**
 * A new RemoteParticipant joined the Room.
 * 
 * @param {*} participant 
 * @param {*} container 
 */
function participantConnected(participant, container) {
	// If participant has already published tracks.
	participant.tracks.forEach(function (publication) {
		trackPublished(publication, container);
	});

	// If participant publishes tracks after it's connection.
	participant.on('trackPublished', function (publication) {
		trackPublished(publication, container);
	});
	participant.on('trackUnpublished', trackUnpublished);
}


/**
 * A new RemoteTrack was published to the Room.
 * 
 * @param {*} publication 
 * @param {*} container 
 */
function trackPublished(publication, container) {
	if (publication.isSubscribed) {
		attachTrack(publication.track, container);
	}

	publication.on('subscribed', function (track) {
		console.log('Subscribed to ' + publication.kind + ' track');
		attachTrack(track, container);
	});
	
	publication.on('unsubscribed', detachTrack);
}

/**
 * A RemoteTrack was unpublished from the Room.
 * 
 * @param {*} publication 
 */
function trackUnpublished(publication) {
	log(publication.kind + ' track was unpublished.');
	// TODO: Should the tracks be detached, once they are unpublished.
}


/**
 * Detach the Participant's Tracks from the DOM.
 * 
 * @param {*} participant 
 */
function detachParticipantTracks(participant) {
	var tracks = getTracks(participant);
	tracks.forEach(detachTrack);
}


/**
 * Detach given track from the DOM.
 * 
 * @param {*} track 
 */
function detachTrack(track) {
	track.detach().forEach(function (element) {
		element.remove();
	});
}

/**
 * Attach the Track to the DOM. Apart from attaching the track, video recorder 
 * is initialized. 
 * 
 * @param {*} track 
 * @param {*} container 
 */
function attachTrack(track, container) {
	var htmlMediaElement = track.attach();

	console.log("Track Kind:" + track.kind);
	if ("video" == track.kind) {
		$(htmlMediaElement).click(touchOnStream)

		// Get the video stream from the HTTP media element.
		var stream = htmlMediaElement.captureStream();

		recorder = RecordRTC(stream, {
			// audio, video, canvas, gif
			type: 'video',

			// audio/webm
			// video/webm\;codecs=h264
			mimeType: 'video/webm\;codecs=h264',

			getNativeBlob: true,

			// MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
			// CanvasRecorder, GifRecorder, WhammyRecorder
			recorderType: RecordRTC.WhammyRecorder,

			// used by CanvasRecorder and WhammyRecorder
			canvas: {
				width: VIDEO_STREAM_WIDTH,
				height: VIDEO_STREAM_HEIGHT
			}
		})

		// Enable recorder.
		document.getElementById('btn-start-recording').disabled = false;		
	}
	container.appendChild(htmlMediaElement);
}



/**
 * 
 * 
 * 			EVENT HANDLERS
 * 
 * 
 */


 /**
  * User has initiated recording. 
  */
function startRecordingClicked() {
	this.disabled = true;

	isStoppedRecording = false;
	isRecordingStarted = true;

	eventArray = [];

	recordingTimerStart = (new Date()).getTime();

	recorder.startRecording();
	document.getElementById('btn-stop-recording').disabled = false;
}

/**
 * User has finished recording.
 */
function stopRecordingClicked() {
	this.disabled = true;

	recorder.stopRecording(function () {
		isRecordingStarted = false;
		isStoppedRecording = true;

		var recordedBlobs = recorder.getBlob();
		RecordRTC.invokeSaveAsDialog(recordedBlobs, fileName + ".webm");

		var json = '{\n';
		eventArray.forEach(function (element) {
			json += element + "," + "\r\n";
		});
		json = json.substring(0, json.length - 3)
		json += "\n}"

		console.log(json);
		var hiddenElement = document.createElement('a');
		hiddenElement.href = 'data:text/json;charset=utf-8,' + encodeURI(json);
		hiddenElement.target = '_blank';
		hiddenElement.download = fileName + '.json';
		hiddenElement.click();

		document.getElementById('btn-start-recording').disabled = false;
	});
 }

function touchOnStream(e) { 
	var posX = $(this).offset().left, posY = $(this).offset().top;
	var xPerc = (e.pageX - posX * 1.0) / VIDEO_STREAM_WIDTH
	var yPerc = (e.pageY - posY * 1.0) / VIDEO_STREAM_HEIGHT
	$('#last_event').text(
		"touch (" + (xPerc * VIDEO_STREAM_WIDTH) + ", " + (yPerc * VIDEO_STREAM_HEIGHT) + ")")

	if (xPerc < 0) {
		xPerc = 0
	}

	if (yPerc < 0) {
		yPerc = 0
	}

	const message = {
		type: 'mouse',
		xPercentage: xPerc,
		yPercentage: yPerc,
		subtype: 'touch'
	}

	eventArray.push(message)

	sendMessage(message, 'event_console2server')
};

function sendMessage(jsonMessage, methodName) {
	const msg = JSON.stringify(jsonMessage);
	console.log(msg);
	socket.emit(methodName, msg);
}
