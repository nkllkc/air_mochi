require('dotenv').load();

var path = require('path');
var express = require('express');
var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

// Build an express app.
const app = express();
app.set('view engine', 'pug');


const server = require('http').Server(app);
const io = require('socket.io')(server);

// Max. period that a Participant is allowed to be in a Room (currently 14400 seconds or 4 hours)
const MAX_ALLOWED_SESSION_DURATION = 14400;


app.get('/', (req, res) => {
    res.render('index.pug');
  });
  
  app.get('/token', function(request, response) {
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
  
  io.on('connect', function(){
    console.log("WebSocket with " + "huhuu" + " has been opened.")
  });
  
  io.on('disconnect', function(){"WebSocket is closed"});
  
  io.on('connection', socket => {
    socket.on('callaback_client2server', msg => {
      io.emit('callback_server2client', msg);
    });
  
    socket.on('event_console2server', msg => {
      io.emit('event_server2client', msg);
    });
  });
  
  if (module === require.main) {
    const PORT = process.env.PORT || 8080;
    // '10.25.53.254',
    server.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
      console.log('Press Ctrl+C to quit.');
    });
  }