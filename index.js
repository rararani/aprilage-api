"use strict";

const runApp = require('./app');
const express = require('express');

const awsServerlessExpress = require(process.env.NODE_ENV === "test"
 ? "../../index"
 : "aws-serverless-express");

const app = express();

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below, then redeploy (`npm run package-deploy`)

// The selected types will be compressed and encoded as base64
// TODO: Determine if we can leave compression here and De-compress on lamda gateway
const binaryMimeTypes = [
  // "application/javascript",
  // "application/json",
  // "application/octet-stream",
  // "application/xml",
  // "font/eot",
  // "font/opentype",
  // "font/otf",
  // "image/jpeg",
  // "image/png",
  // "image/svg+xml",
  // "text/comma-separated-values",
  // "text/css",
  // "text/html",
  // "text/javascript",
  // "text/plain",
  // "text/text",
  // "text/xml"
];

runApp(app);

let server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);;

exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};
