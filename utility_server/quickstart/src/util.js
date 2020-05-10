// Attach the Track to the DOM.
function attachTrack(track, container) {
  container.appendChild(track.attach());
}

// Attach array of Tracks to the DOM.
function attachTracks(tracks, container) {
  tracks.forEach(function(track) {
    attachTrack(track, container);
  });
}

// Detach given track from the DOM
function detachTrack(track) {
  track.detach().forEach(function(element) {
    element.remove();
  });
}

// A new RemoteTrack was published to the Room.
function trackPublished(publication, container) {
  if (publication.isSubscribed) {
    attachTrack(publication.track, container);
  }
  publication.on('subscribed', function(track) {
    log('Subscribed to ' + publication.kind + ' track');
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
  participant.tracks.forEach(function(publication) {
    trackPublished(publication, container);
  });
  participant.on('trackPublished', function(publication) {
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

function clickEvent() {
  console.log("Clicked()")

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

function keyboardPressed(event) {
  // User has pressed 'h', meaning that we should go to home screen.
  if (event.key == 'h') {
      console.log("Homescreen!")
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