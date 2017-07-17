//const xrServer = require('./../src')
const xrServer = require('xr-server')
const config = require('./config');
const service = require('./service');
const remote = require('./remote');

const server = new xrServer(config, service, remote);

server.start();
