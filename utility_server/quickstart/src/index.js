'use strict';

const server_location = 'http://softarch.usc.edu:3000/'

const fs = require('browserify-fs')

const io = require('socket.io-client');
const socket = io(server_location);

// import RecordRTC from 'recordrtc';
const RecordRTC = require('recordrtc');

var eventLog = document.getElementById('event-log');

var Video = require('twilio-video');

var fileName = "some_download"

var eventArray = [];

var activeRoom;
var identity;
var roomName;

var recordingTimerStart;

var recorder;

var isRecordingStarted = false;
var isStoppedRecording = false;

var iosDevicePresent = false;

var currentX = 0;
var currentY = 0;

document.getElementById('btn-start-recording').onclick = function () {
	this.disabled = true;

	isStoppedRecording = false;
	isRecordingStarted = true;

	eventArray = [];

	recordingTimerStart = (new Date()).getTime();

	recorder.startRecording();
	document.getElementById('btn-stop-recording').disabled = false;
};

document.getElementById('btn-stop-recording').onclick = function () {
	this.disabled = true;

	recorder.stopRecording(function () {
		isRecordingStarted = false;
		isStoppedRecording = true;

		var recordedBlobs = recorder.getBlob();
		// document.getElementById('preview-video').srcObject = null;
		// document.getElementById('preview-video').src = URL.createObjectURL(blob);
		// document.getElementById('preview-video').parentNode.style.display = 'block';

		// var file = new File([recordedBlobs], 'video.mp4', {
		// 	type: 'video/mp4'
		// });

		RecordRTC.invokeSaveAsDialog(recordedBlobs, fileName + ".webm");

		// let csvContent = "data:text/csv;charset=utf-8,";
		var csv = '';
		eventArray.forEach(function (element) {
			csv += element + "," + "\r\n";
		});

		console.log(csv);
		var hiddenElement = document.createElement('a');
		hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
		hiddenElement.target = '_blank';
		hiddenElement.download = fileName + '.csv';
		hiddenElement.click();

		document.getElementById('btn-start-recording').disabled = false;

		// window.open(URL.createObjectURL(blob));
	});
};

// When we are about to transition away from this page, disconnect
// from the room, if joined.
window.addEventListener('beforeunload', function () {
	if (activeRoom) {
		activeRoom.disconnect();
	}
});

// Obtain a token from the server in order to connect to the Room.
// $.getJSON('/token?identity=tester', function (data){
// 	identity = data.identity;
//
// 	console.log("Connecting!");
//
// 	// Join the Room with the token from the server and the
// 	// LocalParticipant's Tracks.
// 	Video.connect(data.token, connectOptions).then(roomJoined, function (error) {
// 		console.log('Could not connect to Twilio: ' + error.message);
// 	});
// });

$.getJSON('/session',function(data){
	var deviceId = data.deviceId;
	var tester_name = data.name;
	$.getJSON('/token?identity='+tester_name, function(data){
		var token = data.token;
		console.log(tester_name+" is connecting to room "+ roomName);
		roomName = "Room_"+deviceId;
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


// Successfully connected!
function roomJoined(room) {
	window.room = activeRoom = room;

	console.log("Joined as '" + identity + "'");

	// Attach the Tracks of the Room's Participants.
	var remoteMediaContainer = document.getElementById('remote-media');
	room.participants.forEach(function (participant){
		// if (participant.identity != "ios_device") {
		// 	console.log("Not valid participant identity: '" + participant.identity + "'");
		// 	return;
		// }
		if (iosDevicePresent) {
			console.log("IOS DEVICE ALREADY PRESENT!!!");
			// TODO(nikola): Handle this.
			return;
		}
		iosDevicePresent = true;
		participantConnected(participant, remoteMediaContainer);
	});

	// When a Participant joins the Room, log the event.
	room.on('participantConnected', function (participant) {
		if (participant.identity != "ios_device") {
			console.log("Not valid participant identity: '" + participant.identity + "'");
			return;
		}

		if (iosDevicePresent) {
			console.log("IOS DEVICE ALREADY PRESENT!!!");
			// TODO(nikola): Handle this.
		}
		iosDevicePresent = true;

		participantConnected(participant, remoteMediaContainer);
	});

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

// ******************* VIDEO UTILS *******************

// Attach the Track to the DOM.
function attachTrack(track, container) {
	var htmlMediaElement = track.attach();

	console.log("Track Kind:" + track.kind);
	if ("video" == track.kind) {
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
				width: 720,
				height: 540
			}
		})

		// Enable recorder.
		document.getElementById('btn-start-recording').disabled = false;

		// This is needed in order not to start the drag outside and finish inside 
		// the device's screen.
		var down = false;

		$(htmlMediaElement).click(function (e) {
			// e = Mouse click event.

			var canvas = $(htmlMediaElement).get()[0];
			canvas.requestPointerLock = canvas.requestPointerLock ||
				canvas.mozRequestPointerLock ||
				canvas.webkitRequestPointerLock;

			// Ask the browser to lock the pointer)
			canvas.requestPointerLock();
		});

		document.addEventListener('pointerlockchange', lockChangeAlert, false);
		document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

		function lockChangeAlert() {
			let canvas = $(htmlMediaElement).get()[0];
			if (document.pointerLockElement === canvas ||
				document.mozPointerLockElement === canvas) {
				console.log('The pointer lock status is now locked');

				document.addEventListener("mousemove", trackingEvent, true);
				document.addEventListener("click", clickEvent, false);
				document.addEventListener("keydown", keyboardEvent, false);
			} else {
				console.log('The pointer lock status is now unlocked');

				document.removeEventListener("mousemove", trackingEvent, true);
				document.removeEventListener("click", clickEvent, false);
				document.removeEventListener("keydown", keyboardEvent, false);
			}
		}
	}
	container.appendChild(htmlMediaElement);
}







/**
 * 
 *          WebRTC (Twilio) Handlers
 *   
 * 
 */







// Attach array of Tracks to the DOM.
function attachTracks(tracks, container) {
	tracks.forEach(function (track) {
		attachTrack(track, container);
	});
}

// Detach given track from the DOM
function detachTrack(track) {
	track.detach().forEach(function (element) {
		element.remove();
	});
}

// A new RemoteTrack was published to the Room.
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

// A RemoteTrack was unpublished from the Room.
function trackUnpublished(publication) {
	log(publication.kind + ' track was unpublished.');
}

// A new RemoteParticipant joined the Room
function participantConnected(participant, container) {
	participant.tracks.forEach(function (publication) {
		trackPublished(publication, container);
	});
	participant.on('trackPublished', function (publication) {
		trackPublished(publication, container);
	});
	participant.on('trackUnpublished', trackUnpublished);
}

// Detach the Participant's Tracks from the DOM.
function detachParticipantTracks(participant) {
	var tracks = getTracks(participant);
	tracks.forEach(detachTrack);
}






/**
 * 
 *              EVENT HANDLERS
 * 
 */






function clickEvent(e) {
	var currentTime = (new Date()).getTime() - recordingTimerStart;
	const newMessage = '' + currentTime + ':click[' + currentX + '-' + currentY + ']';

	if (isRecordingStarted) {
		eventArray.push(newMessage);
	}

	const previousInnerHtml = eventLog.innerHTML;
	eventLog.innerHTML = newMessage;
	eventLog.innerHTML += '<br/>';
	eventLog.innerHTML += previousInnerHtml;

	var msg_json = {
		_b: 1,
		_x: 0,
		_y: 0,
		_w: 0
	}
	// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
	var msg = JSON.stringify(msg_json);
	console.log(msg);
	socket.emit('event_console2server', msg);
}

function trackingEvent(e) {
	var x = e.movementX
	var y = e.movementY

	currentX += x;
	currentY += y;

	if (currentX < 0) {
		currentX = 0;
	}
	if (currentY < 0) {
		currentY = 0;
	}
	if (currentX >= 720) {
		currentX = 719;
	}
	if (currentY >= 540) {
		currentY = 539;
	}

	if (Math.sqrt(x * x + y * y) < 3) {
		return
	}

	var msg_json = {
		_b: 0,
		_x: e.movementX,
		_y: e.movementY,
		_w: 0
	}

	// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
	var msg = JSON.stringify(msg_json);
	console.log(msg);
	socket.emit('event_console2server', msg);
}

function keyboardEvent(event) {
	// User has pressed 'h', meaning that we should go to home screen.
	if (event.key == 'h') {
		console.log("Homescreen!")

		var currentTime = recordingTimerStart - date.getTime();
		var logString = '' + currentTime + ': homescreen';

		eventLog.innerHTML += '\n';
		eventLog.innerHTML += logString;

		var msg_json = {
			_b: 2,
			_x: 0,
			_y: 0,
			_w: 0
		}
		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
		var msg = JSON.stringify(msg_json);
		console.log(msg);
		socket.emit('event_console2server', msg);
	}

	// Screenshot.
	if (event.key == 's') {
		console.log("Screenshot!")

		// var currentTime = recordingTimerStart - date.getTime();
		// eventLog.innerHTML += '' + currentTime + ': screenshot';
		// eventLog.innerHTML += '\n';

		var msg_json = {
			_b: 4,
			_x: 0,
			_y: 0,
			_w: 0
		}
		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
		var msg = JSON.stringify(msg_json);
		console.log(msg);
		socket.emit('event_console2server', msg);
	}

	// Notifications.
	if (event.key == 'n') {
		console.log("Notifications!")

		// var currentTime = recordingTimerStart - date.getTime();
		// eventLog.innerHTML += '' + currentTime + ': notification';
		// eventLog.innerHTML += '\n';    

		var msg_json = {
			_b: 8,
			_x: 0,
			_y: 0,
			_w: 0
		}
		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
		var msg = JSON.stringify(msg_json);
		console.log(msg);
		socket.emit('event_console2server', msg);
	}

	// Control Center.
	if (event.key == 'c') {
		console.log("Control Center!")
		var msg_json = {
			_b: 16,
			_x: 0,
			_y: 0,
			_w: 0
		}
		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
		var msg = JSON.stringify(msg_json);
		console.log(msg);
		socket.emit('event_console2server', msg);
	}

	// Dock.
	if (event.key == 'd') {
		console.log("Dock!")
		var msg_json = {
			_b: 32,
			_x: 0,
			_y: 0,
			_w: 0
		}
		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
		var msg = JSON.stringify(msg_json);
		console.log(msg);
		socket.emit('event_console2server', msg);
	}

	// Scrool Down!
	if (event.key == 'ArrowDown') {
		console.log("Screenshot!")
		var msg_json = {
			_b: 0,
			_x: 0,
			_y: 0,
			_w: -1
		}
		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
		var msg = JSON.stringify(msg_json);
		console.log(msg);
		socket.emit('event_console2server', msg);
	}

	// Scrool Up!
	if (event.key == 'ArrowUp') {
		console.log("Screenshot!")
		var msg_json = {
			_b: 0,
			_x: 0,
			_y: 0,
			_w: 1
		}
		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
		var msg = JSON.stringify(msg_json);
		console.log(msg);
		socket.emit('event_console2server', msg);
	}

}

function sendMessage(msg_json) {
	var msg = JSON.stringify(msg_json);
	console.log(msg);
	socket.emit('event_console2server', msg);
}