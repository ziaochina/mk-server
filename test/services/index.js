const { config, api: { start } } = require('./../../src'); 

config({
    host: "localhost",
    port: 8000,
    apiRootUrl: "/v1",
    services: {
        say: {
            apiRootUrl: "/",
            api: {
                helloworld: () => "hello world", //http://localhost:8000/v1/helloworld
            },
        },
        user: {
            api: {
                create: (dto, ctx) => dto, //http://localhost:8000/v1/user/create
            },
        },
        userLog: {
            name: "user_log",
            api: {
                create: (dto, ctx) => dto, //http://localhost:8000/v1/user/log/create
            },
        },
    },
});

start();