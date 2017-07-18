const Server = require('./../../src');
//const Server = require('mk-server');

const server = new Server();

server.config({
  config: {"host": "localhost", "port": 8000, "apiRootUrl": "/v1"},
  services: {
    say: {
      name: "helloworld",
      api: {
        helloworld: () => "helloworld",           //http://localhost:8000/v1/say/helloworld
      },
    },
    user: {
      name: "user",
      api: {
        create: (dto, ctx) => ctx.return(dto),    //http://localhost:8000/v1/user/create
      },
    },
  },
});

server.start();
