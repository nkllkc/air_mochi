'use strict';

// const server_location = 'http://softarch.usc.edu:3000/'
const server_location = 'http://192.168.1.126:3000/'


const fs = require('browserify-fs')

const io = require('socket.io-client');
const socket = io(server_location);

// import RecordRTC from 'recordrtc';
const RecordRTC = require('recordrtc');
// const fs = require('fs');

var eventLog = document.getElementById('event-log');

var Video = require('twilio-video');

var fileName = "some_download";

var eventArray = [];

var activeRoom;
var identity;
var roomName;

var recordingTimerStart;

var recorder;

var isRecordingStarted = false;
var isStoppedRecording = false;

var iosDevicePresent = false;
var scenarioName;
//
// const VIDEO_STREAM_WIDTH = 720;
// const VIDEO_STREAM_HEIGHT = 540;

const VIDEO_STREAM_WIDTH = 240;
const VIDEO_STREAM_HEIGHT = 426;

var currentX = 0;
var currentY = 0;
var scenarios;

document.getElementById('btn-start-replay').onclick = getScenario;

document.getElementById('start-recording').onclick = function (){
	console.log('recording started');
	// this.disabled = true;
	isStoppedRecording = false;
	isRecordingStarted = true;
	eventArray = [];
	recordingTimerStart = (new Date()).getTime();
	// recorder.startRecording();
	document.getElementById('btn-stop-recording').disabled = false;
	document.getElementById('btn-start-recording').disabled = true;
	scenarioName = document.getElementById('message-text').value;
	$('#exampleModal').modal('toggle');
	const message = {
		type: 'mouse',
		xPercentage: 0,
		yPercentage: 0,
		subtype: 'touch'
	};
	sendMessage(message, 'event_console2server_calibrate');
};
var currentScenarioOptions = [];
document.getElementById('btn-replay').onclick = function(){
	$.getJSON('/scenarios',function(data){
		scenarios  = [];
		scenarios = data.scenarios;
		var scenarioOptions = document.getElementById('scenario_select');
		scenarios.forEach(scenario => {
			if(currentScenarioOptions.includes(scenario)){

			}
			else{
				var newOption = document.createElement("option");
				newOption.value = scenario;
				newOption.innerHTML = scenario;
				scenarioOptions.options.add(newOption);
				currentScenarioOptions.push(scenario);
			}
		});
	});
}

document.getElementById('btn-stop-recording').onclick = function () {
	this.disabled = true;
	isRecordingStarted = false;
	isStoppedRecording = true;
	var events = []
	eventArray.forEach(function (element) {
		//csv += element + "," + "\r\n";
		events.push(element)

	});
	var recordedSession = {
		name: scenarioName,
		events: events
	}
	console.log(recordedSession);
	var stringEvents = JSON.stringify(recordedSession);
	console.log(stringEvents)
	document.getElementById('btn-start-recording').disabled = false;
	// $.post('/recordsession', stringEvents , function () {
	// 	// 	console.log("recorded session is now sent to the server.")
	// 	// });

	$.ajax({
		url: '/recordsession',
		type:"POST",
		data: stringEvents,
		contentType:"application/json",
		dataType:"json",
		success: function(result){
			console.log("recorded session is now sent to the server.")
		}
	})
	// recorder.stopRecording(function(){
	// 	isRecordingStarted = false;
	// 	isStoppedRecording = true;
	// 	var recordedBlobs = recorder.getBlob();
	// 	// document.getElementById('preview-video').srcObject = null;
	// 	// document.getElementById('preview-video').src = URL.createObjectURL(blob);
	// 	// document.getElementById('preview-video').parentNode.style.display = 'block';
	//
	// 	// var file = new File([recordedBlobs], 'video.mp4', {
	// 	// 	type: 'video/mp4'
	// 	// });
	// 	RecordRTC.invokeSaveAsDialog(recordedBlobs, fileName + ".webm");
	// 	// let csvContent = "data:text/csv;charset=utf-8,";
	// 	var csv = '';
	// 	eventArray.forEach(function (element) {
	// 		csv += element + "," + "\r\n";
	// 	});
	// 	console.log(csv);
	// 	var hiddenElement = document.createElement('a');
	// 	hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
	// 	hiddenElement.target = '_blank';
	// 	hiddenElement.download = fileName + '.csv';
	// 	hiddenElement.click();
	// 	document.getElementById('btn-start-recording').disabled = false;
	// 	// window.open(URL.createObjectURL(blob));
	// });
};

// When we are about to transition away from this page, disconnect
// from the room, if joined.
window.addEventListener('beforeunload', function () {
	if (activeRoom) {
		activeRoom.disconnect();
	}
});

window.addEventListener( "keydown", keyboardEvent);

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

		// $(htmlMediaElement).click(function (e){
		// 	// e = Mouse click event.
		//
		// 	var canvas = $(htmlMediaElement).get()[0];
		// 	canvas.requestPointerLock = canvas.requestPointerLock ||
		// 		canvas.mozRequestPointerLock ||
		// 		canvas.webkitRequestPointerLock;
		//
		// 	// Ask the browser to lock the pointer)
		// 	canvas.requestPointerLock();
		// });
		//
		// document.addEventListener('pointerlockchange', lockChangeAlert, false);
		// document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
		//
		// function lockChangeAlert() {
		// 	let canvas = $(htmlMediaElement).get()[0];
		// 	if (document.pointerLockElement === canvas ||
		// 		document.mozPointerLockElement === canvas) {
		// 		console.log('The pointer lock status is now locked');
		//
		// 		document.addEventListener("mousemove", trackingEvent, true);
		// 		document.addEventListener("click", clickEvent, false);
		// 		document.addEventListener("keydown", keyboardEvent, false);
		// 	} else {
		// 		console.log('The pointer lock status is now unlocked');
		//
		// 		document.removeEventListener("mousemove", trackingEvent, true);
		// 		document.removeEventListener("click", clickEvent, false);
		// 		document.removeEventListener("keydown", keyboardEvent, false);
		// 	}
		// }
		//$(htmlMediaElement).click(touchOnStream);
		$(htmlMediaElement).mousedown(pressEvent);
		$(htmlMediaElement).mouseup(releaseEvent);
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





//
// function clickEvent(e) {
// 	var currentTime = (new Date()).getTime() - recordingTimerStart;
// 	const newMessage = '' + currentTime + ':click[' + currentX + '-' + currentY + ']';
//
// 	if (isRecordingStarted) {
// 		eventArray.push(newMessage);
// 	}
//
// 	const previousInnerHtml = eventLog.innerHTML;
// 	eventLog.innerHTML = newMessage;
// 	eventLog.innerHTML += '<br/>';
// 	eventLog.innerHTML += previousInnerHtml;
//
// 	var msg_json = {
// 		_b: 1,
// 		_x: 0,
// 		_y: 0,
// 		_w: 0
// 	}
// 	// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
// 	var msg = JSON.stringify(msg_json);
// 	console.log(msg);
// 	socket.emit('event_console2server', msg);
// }
//
// function trackingEvent(e) {
// 	var x = e.movementX
// 	var y = e.movementY
//
// 	currentX += x;
// 	currentY += y;
//
// 	if (currentX < 0) {
// 		currentX = 0;
// 	}
// 	if (currentY < 0) {
// 		currentY = 0;
// 	}
// 	if (currentX >= 720) {
// 		currentX = 719;
// 	}
// 	if (currentY >= 540) {
// 		currentY = 539;
// 	}
//
// 	if (Math.sqrt(x * x + y * y) < 3) {
// 		return
// 	}
//
// 	var msg_json = {
// 		_b: 0,
// 		_x: e.movementX,
// 		_y: e.movementY,
// 		_w: 0
// 	}
//
// 	// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
// 	var msg = JSON.stringify(msg_json);
// 	console.log(msg);
// 	socket.emit('event_console2server', msg);
// }




// function keyboardEvent(event) {
// 	// User has pressed 'h', meaning that we should go to home screen.
// 	if (event.key == 'h') {
// 		console.log("Homescreen!")
//
// 		var currentTime = recordingTimerStart - date.getTime();
// 		var logString = '' + currentTime + ': homescreen';
//
// 		eventLog.innerHTML += '\n';
// 		eventLog.innerHTML += logString;
//
// 		var msg_json = {
// 			_b: 2,
// 			_x: 0,
// 			_y: 0,
// 			_w: 0
// 		}
// 		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
// 		var msg = JSON.stringify(msg_json);
// 		console.log(msg);
// 		socket.emit('event_console2server', msg);
// 	}
//
// 	// Screenshot.
// 	if (event.key == 's') {
// 		console.log("Screenshot!")
//
// 		// var currentTime = recordingTimerStart - date.getTime();
// 		// eventLog.innerHTML += '' + currentTime + ': screenshot';
// 		// eventLog.innerHTML += '\n';
//
// 		var msg_json = {
// 			_b: 4,
// 			_x: 0,
// 			_y: 0,
// 			_w: 0
// 		}
// 		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
// 		var msg = JSON.stringify(msg_json);
// 		console.log(msg);
// 		socket.emit('event_console2server', msg);
// 	}
//
// 	// Notifications.
// 	if (event.key == 'n') {
// 		console.log("Notifications!")
//
// 		// var currentTime = recordingTimerStart - date.getTime();
// 		// eventLog.innerHTML += '' + currentTime + ': notification';
// 		// eventLog.innerHTML += '\n';
//
// 		var msg_json = {
// 			_b: 8,
// 			_x: 0,
// 			_y: 0,
// 			_w: 0
// 		}
// 		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
// 		var msg = JSON.stringify(msg_json);
// 		console.log(msg);
// 		socket.emit('event_console2server', msg);
// 	}
//
// 	// Control Center.
// 	if (event.key == 'c') {
// 		console.log("Control Center!");
// 		var msg_json = {
// 			_b: 16,
// 			_x: 0,
// 			_y: 0,
// 			_w: 0
// 		}
// 		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
// 		var msg = JSON.stringify(msg_json);
// 		console.log(msg);
// 		socket.emit('event_console2server', msg);
// 	}
//
// 	// Dock.
// 	if (event.key == 'd') {
// 		console.log("Dock!")
// 		var msg_json = {
// 			_b: 32,
// 			_x: 0,
// 			_y: 0,
// 			_w: 0
// 		}
// 		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
// 		var msg = JSON.stringify(msg_json);
// 		console.log(msg);
// 		socket.emit('event_console2server', msg);
// 	}
//
// 	// Scroll Down!
// 	if (event.key == 'ArrowDown') {
// 		console.log("Screenshot!")
// 		var msg_json = {
// 			_b: 0,
// 			_x: 0,
// 			_y: 0,
// 			_w: -1
// 		}
// 		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
// 		var msg = JSON.stringify(msg_json);
// 		console.log(msg);
// 		socket.emit('event_console2server', msg);
// 	}
//
// 	// Scrool Up!
// 	if (event.key == 'ArrowUp') {
// 		console.log("Screenshot!")
// 		var msg_json = {
// 			_b: 0,
// 			_x: 0,
// 			_y: 0,
// 			_w: 1
// 		}
// 		// console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
// 		var msg = JSON.stringify(msg_json);
// 		console.log(msg);
// 		socket.emit('event_console2server', msg);
// 	}
//
// }

// function sendMessage(msg_json) {
// 	var msg = JSON.stringify(msg_json);
// 	console.log(msg);
// 	socket.emit('event_console2server', msg);
// }


function forEachWithCallback(callback) {
	const arrayCopy = this;
	let index = 0;
	const next = () => {
		index++;
		if (arrayCopy.length > 0) {
			callback(arrayCopy.shift(), index, next);
		}
	}
	next();
}

Array.prototype.forEachWithCallback = forEachWithCallback;

document.getElementById('phone-container').onScroll = scroll;


function keyboardEvent(e){
	console.log('keyboardevent')
	var key= e.key;
	const message = {
		type: 'keyboard',
		val: key
	};

	if(isRecordingStarted){
		const log = {
			message: message,
			time: (new Date()).getTime() - recordingTimerStart
		};
		eventArray.push(log);
	}
	sendMessage(message, 'event_console2server_keyboard')
}

function scrollEvent(e){
	console.log('scroll event!')
	console.log(e)
}

function touchOnStream(e){
	var posX = $(this).offset().left;
	console.log('posX:'+ posX);
	var posY = $(this).offset().top;
	console.log('posY:'+ posY);

	console.log('pageX:'+e.pageX);
	console.log('pageY:'+e.pageY);

	var xPerc = (e.pageX - posX * 1.0) / VIDEO_STREAM_WIDTH;
	var yPerc = (e.pageY - posY * 1.0) / VIDEO_STREAM_HEIGHT;

	console.log('xPerc:'+ xPerc);
	console.log('yPerc:'+ yPerc);
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
	};

	if(isRecordingStarted){
		const log = {
			message: message,
			time: (new Date()).getTime() - recordingTimerStart
		};
		eventArray.push(log);
		console.log(log);
	}
	sendMessage(message, 'event_console2server')
}
//
// $('#exampleModal').on('show.bs.modal', function (event) {
// 	var button = $(event.relatedTarget) // Button that triggered the modal
// 	var recipient = button.data('whatever') // Extract info from data-* attributes
// 	// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
// 	// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
// 	var modal = $(this)
// 	modal.find('.modal-title').text('New message to ' + recipient)
// 	modal.find('.modal-body input').val(recipient)
// });


function releaseEvent(e){
	console.log('release event')
	var posX = $(this).offset().left;
	console.log('posX:'+ posX);
	var posY = $(this).offset().top;
	console.log('posY:'+ posY);

	console.log('pageX:'+e.pageX);
	console.log('pageY:'+e.pageY);

	var xPerc = (e.pageX - posX * 1.0) / VIDEO_STREAM_WIDTH;
	var yPerc = (e.pageY - posY * 1.0) / VIDEO_STREAM_HEIGHT;

	console.log('xPerc:'+ xPerc);
	console.log('yPerc:'+ yPerc);
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
		subtype: 'release'
	};

	if(isRecordingStarted){
		const log = {
			message: message,
			time: (new Date()).getTime() - recordingTimerStart
		};
		eventArray.push(log);
		console.log(log);
	}
	sendMessage(message, 'event_console2server')
}

function pressEvent(e){
	console.log('press event')
	var posX = $(this).offset().left;
	console.log('posX:'+ posX);
	var posY = $(this).offset().top;
	console.log('posY:'+ posY);

	console.log('pageX:'+e.pageX);
	console.log('pageY:'+e.pageY);

	var xPerc = (e.pageX - posX * 1.0) / VIDEO_STREAM_WIDTH;
	var yPerc = (e.pageY - posY * 1.0) / VIDEO_STREAM_HEIGHT;

	console.log('xPerc:'+ xPerc);
	console.log('yPerc:'+ yPerc);
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
		subtype: 'press'
	};

	if(isRecordingStarted){
		const log = {
			message: message,
			time: (new Date()).getTime() - recordingTimerStart
		};
		eventArray.push(log);
		console.log(log);
	}
	sendMessage(message, 'event_console2server')
}

function getScenario(){
	var selectedSenario = document.getElementById('scenario_select').value;
	console.log(selectedSenario);
	$.getJSON('/scenario?name='+selectedSenario,function(data){
		$('#replayModal').modal('toggle');
		eventArray = data.events;
		replay();
	});

}

function replay(){
	console.log('replay started!');
	console.log((new Date()).getTime());
	const message = {
		type: 'mouse',
		xPercentage: 0,
		yPercentage: 0,
		subtype: 'touch'
	};
	sendMessage(message, 'event_console2server_calibrate');
	var prev_action_time = 0;
	eventArray.forEachWithCallback((event, i, next) => {
		var message = event.message;
		var time = event.time;
		var eventType = message.type;
		var subType = message.subtype;
		var methodName;
		var diff = time - prev_action_time;
		console.log('diff:'+diff);
		if(eventType=='mouse'){
			methodName = 'event_console2server';
		}else{
			methodName = 'event_console2server_keyboard';
		}
		if(subType == 'release');
			 diff = diff - 900
			 console.log(diff)
		setTimeout(() => {
			sendMessage(message, methodName);
			next();
			prev_action_time = time;
		}, diff);
	});
}

function sendMessage(jsonMessage, methodName) {
	const msg = JSON.stringify(jsonMessage);
	console.log(msg);
	socket.emit(methodName, msg);
}