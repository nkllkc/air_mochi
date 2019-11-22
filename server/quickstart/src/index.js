'use strict';

const io = require('socket.io-client');
var socket = io();

var Video = require('twilio-video');

var activeRoom;
var previewTracks;
var identity;
var roomName;

var iosDevicePresent = false;

// When we are about to transition away from this page, disconnect
// from the room, if joined.
window.addEventListener('beforeunload', function() { 
  if (activeRoom) {
    activeRoom.disconnect();
  }
});

// Obtain a token from the server in order to connect to the Room.
$.getJSON('/token?identity=tester', function(data) {
  identity = data.identity;

  console.log("Connecting!");
  // The name of the room to join.
  roomName = "Broadcast";

  var connectOptions = {
    name: roomName,
    logLevel: 'debug'
  };

  var localTracksPromise = previewTracks
    ? Promise.resolve(previewTracks)
    : Video.createLocalTracks();

  localTracksPromise.then(function(tracks) {
    window.previewTracks = previewTracks = tracks;
  }, function(error) {
    console.error('Unable to access local media', error);
    console.log('Unable to access Camera and Microphone');
  });

  if (previewTracks) {
    console.log("PreviewTracks: " + previewTracks)
    connectOptions.tracks = previewTracks;
  } else {
    console.log("NO PREVIEW TRACKS.")
  }

  // Join the Room with the token from the server and the
  // LocalParticipant's Tracks.
  Video.connect(data.token, connectOptions).then(roomJoined, function(error) {
    console.log('Could not connect to Twilio: ' + error.message);
  });
});

// Successfully connected!
function roomJoined(room) {
  window.room = activeRoom = room;

  console.log("Joined as '" + identity + "'");

  // Attach the Tracks of the Room's Participants.
  var remoteMediaContainer = document.getElementById('remote-media');
  room.participants.forEach(function(participant) {
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

  // When a Participant joins the Room, log the event.
  room.on('participantConnected', function(participant) {
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
  room.on('participantDisconnected', function(participant) {
    console.log("RemoteParticipant '" + participant.identity + "' left the room");
    
    if (participant.identity == "ios_device") {
      iosDevicePresent = false;
    }

    detachParticipantTracks(participant);
  });

  // Once the LocalParticipant leaves the room, detach the Tracks
  // of all Participants, including that of the LocalParticipant.
  room.on('disconnected', function() {
    console.log('Left');
    if (previewTracks) {
      previewTracks.forEach(function(track) {
        track.stop();
      });
      previewTracks = null;
    }

    // The following is not needed since we are not attaching local tracks.
    // detachParticipantTracks(room.localParticipant);
    
    room.participants.forEach(function(participant) {
      detachParticipantTracks(participant);
    });

    activeRoom = null;  
  });
}

// ******************* VIDEO UTILS *******************

// Attach the Track to the DOM.
function attachTrack(track, container) {
  var track_html = track.attach();

  console.log("Track Kind:" + track.kind);
  if ("video" == track.kind) {
    
    // // TODO(nikola): Make sure you add this listener, since the size of 
    // // the video screen is changing (on network quality change). Notify 
    // // the localServer about the change ot the size, so it knows how to
    // // map values. Maybe you will need to cast it to VideoTrack. In 
    // // order to cast it you need to import VideoTrack class into here.
    // track.addEventListener("dimensionsChanged", function() {
    //   console.log("HIHIHIHI");
    // });
    track.dimensionsChanged = function(new_track) {
      console.log("Callback is working: " + new_track);
    }
    
    console.log("Setting onclick for video element.");
    track_html.onclick = function(e) {
      // element that has been clicked. 
		  var elm = $(this); 
      
      const height = elm.height();
      const width = elm.width();

      console.log("Hight: " + height);
      console.log("Width: " + width);

      // getting the respective 
		  var x = e.pageX - elm.offset().left; 

      x = x - (height / 2);
      y = y - (width / 2);

      // coordinates of location. 
		  var y = e.pageY - elm.offset().top; 
    
      console.log("X: " + x + ",Y: " + y);
      socket.emit("callaback_client2server", "H=" + height + "&" + "W=" + width 
                  + "$" + "X=" + x + "&" + "Y=" + y);
    }
  }
  container.appendChild(track_html);
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
    console.log('Subscribed to ' + publication.kind + ' track');
    attachTrack(track, container);
  });
  publication.on('unsubscribed', detachTrack);
}

// A RemoteTrack was unpublished from the Room.
function trackUnpublished(publication) {
  console.log(publication.kind + ' track was unpublished.');
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

// Get the Participant's Tracks.
function getTracks(participant) {
  return Array.from(participant.tracks.values()).filter(function(publication) {
    return publication.track;
  }).map(function(publication) {
    return publication.track;
  });
}

// ******************* CALLBACKS *******************

// document.getElementById('remote-media').onclick = function() {
//   // console.log("CLICKED");
// }
