const Server = require('./../../src');
const config = require('./config');
const api = require('./api');
const services = {
  api,
}
const server = new Server()

server.config({config, services});

server.start();
