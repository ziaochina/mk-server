const Server = require('./../../src');
//const Server = require('mk-server');

const server = new Server();

server.config({
  "host": "localhost", "port": 8000, "apiRootUrl": "/v1",
  services: {
    say: {
      name: "say",
      api: {
        helloworld: () => "helloworld",           //http://localhost:8000/v1/say/helloworld
      },
    },
    user: {
      name: "user",
      api: {
        create: (dto, ctx) => ctx.return(ctx.request.headers),    //http://localhost:8000/v1/user/create
        ping: (dto) => dto,
      },
    },
  },
});

server.start();
