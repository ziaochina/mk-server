const xrServer = require('./../../src');
const config = require('./config');
const service = require('./api');

const server = new xrServer(config, service);

server.start();
