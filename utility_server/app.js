/**
 * Copyright 2018, Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Load Twilio configuration from .env config file - the following environment
 * variables should be set:
 * process.env.TWILIO_ACCOUNT_SID
 * process.env.TWILIO_API_KEY
 * process.env.TWILIO_API_SECRET
 */
require('dotenv').load();

var path = require('path');
var express = require('express');
var AccessToken = require('twilio').jwt.AccessToken;
var bodyParser = require('body-parser');
var VideoGrant = AccessToken.VideoGrant;
var available_devices = [];
var scenarios = [];

// Build an express app.
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs')
var cors = require('cors')


// const server_location = 'http://softarch.usc.edu:3000/'
// const socket = io(server_location);

// Max. period that a Participant is allowed to be in a Room (currently 14400 seconds or 4 hours)
const MAX_ALLOWED_SESSION_DURATION = 14400;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var quickstartPath = path.join(__dirname, 'quickstart/public');
app.use('/quickstart', express.static(quickstartPath));

var loginpagePath = path.join(__dirname, 'views/');
app.use('/', express.static(loginpagePath));

var tmpPath = path.join(__dirname, 'tmp/public');
app.use('/tmp', express.static(tmpPath));

var deviceId;
var name;

app.use(cors());

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/token', function(request, response){
  var identity = request.query.identity || "randomName";
  // Create an access token which we will sign and return to the client,
  // containing the grant we just created.
  var token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    { ttl: MAX_ALLOWED_SESSION_DURATION }
  );
  // Assign the generated identity to the token.

  token.identity = identity;
  // Grant the access token Twilio Video capabilities.
  var grant = new VideoGrant();
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response.
  response.send({
    identity: identity,
    token: token.toJwt()
  });
});

app.get('/info', function(request, response){
  console.log(request.query);
  name = request.query.tester_name;
  deviceId = request.query.device_select;
  response.redirect('/quickstart');
});

app.get('/session', function(request, response){
  response.send({
    deviceId: deviceId,
    name: name
  })
});

app.post('/device', function(request, response){
  var deviceId = request.body.deviceId;
  var deviceType = request.body.deviceType;
  console.log('device');
  available_devices.push({
    deviceId: deviceId,
    deviceType: deviceType
  });
  // for now preserve it locally.
  // when tester is added -> get all the active phones types => get the room nanme for the selected name -> join the room with the selected name
  response.send({
      statusCode: 200
  })
});

app.post('/recordsession', function(request, response){
  console.log("recordedsession");
  console.log(request.body)
  var name = request.body.name;
  scenarios.push(name);
  var filename = name + ".txt";
  var events = request.body;
  console.log(events);
  fs.writeFile(filename, JSON.stringify(events), function(){
    console.log("recorded session logged in:"+ filename);
  });
});

app.post('/delete', function(request, response){
  var deviceId = request.body.deviceId;
  console.log(" in delete request");
  console.log(available_devices);
  //available_devices = available_devices.filter(device => ((device.deviceId)!=deviceId));
  available_devices = [];
});

app.get('/devices', function(request, response){
  console.log('devices');
  response.send({
    available_devices: available_devices
  })
});

app.get('/scenarios', function(request, response){
  console.log('scenarios');
  response.send({
    scenarios: scenarios
  });
});

app.get('/scenario', function(request, response){
  console.log('scenario');
  var scenarioName = request.query.name;
  var fileName = scenarioName + '.txt';
  console.log('filename in scenario:'+fileName)
  fs.readFile(fileName, (err, data) => {
    if(err){
      console.log(err)
    }
    else {
      let events = JSON.parse(data);
      response.send({
        events: events.events
      });
    }
  });
});

// socket.on('connect', function(){
//   console.log("WebSocket with " + server_location + " has been opened.")
// });

// socket.on('disconnect', function(){"WebSocket is closed"});

io.on('connection', socket => {
  socket.on('callaback_client2server', msg => {
    console.log('callaback_client2server')
    io.emit('callback_server2client', msg);
  });

  socket.on('event_console2server', msg => {
    console.log('event_console2server')
    io.emit('event_server2client', msg);
  });

  socket.on('event_console2server_keyboard', msg => {
    console.log('event_console2server_keyboard')
    io.emit('event_server2client_keyboard', msg);
  });

  socket.on('event_console2server_calibrate', msg => {
    console.log('event_console2server_calibrate')
    io.emit('event_server2client_calibrate', msg);
  });
});

if (module === require.main) {
  const PORT = process.env.PORT || 3000;
  // '10.25.53.254',
  server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}
// [END appengine_websockets_app]
