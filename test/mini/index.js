const Server = require('./../../src');
//const Server = require('mk-server');

const server = new Server();
server.config({
  config: {"host": "localhost", "port": 8000, "apiRootUrl": "/v1"},
  services: {
    //http://localhost:8000/v1/say/helloworld
    say: {
      name: "helloworld",
      api: {
        helloworld: () => "helloworld"
      }
    },
    //http://localhost:8000/v1/user/create
    user: {
      name: "user",
      api: {
        create: (dto, ctx) => ctx.return(dto),
      }
    },
  }
});

server.start();
