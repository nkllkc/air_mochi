'use strict';

require('dotenv').load();

var path = require('path');
var express = require('express');

// Build an express app.
const app = express();

const server = require('http').Server(app);

var quickstartPath = path.join(__dirname, 'quickstart/public');
app.use('/', express.static(quickstartPath));

if (module === require.main) {
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}
// [END appengine_websockets_app]
