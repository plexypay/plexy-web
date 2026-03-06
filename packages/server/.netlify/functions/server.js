const serverless = require('serverless-http');
const express = require('express');
const plexyWebServer = require('../../index.js');

const app = express();

const plexyWebExpress = plexyWebServer(app);

// Export the handler function with the correct name
module.exports.handler = serverless(plexyWebExpress);