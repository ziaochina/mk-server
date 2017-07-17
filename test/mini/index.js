const xrServer = require('./../../src');

const server = new xrServer({"host": "localhost", "port": 8000}, {
  //http://localhost:8000/helloworld
  helloworld: () => "helloworld",
  user: {
    //http://localhost:8000/user/create
    create: (dto, ctx) => ctx.return(dto)
  },
});

server.start();
