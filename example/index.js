const Server = require('./../src')
//const Server = require('mk-server')
const config = require('./config');
const dubbo = require('./remote/dubbo')
const rest = require('./remote/rest')
const remote = {
  dubbo,
  rest,
}

const org   = require('./service/org');
const scene = require('./service/scene');
const user  = require('./service/user');

const services = {
  org,
  scene,
  user,
}

const server = new Server();

server.config({
  config,
  services,
  remote
})

server.start();
