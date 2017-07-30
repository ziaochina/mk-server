const { config, start } = require('mk-server');

function myInterceptor(ctx) {
    let _realHandler = ctx.handler
    ctx.handler = (data, ctx) => {
        data.name += " !"
        return _realHandler(data, ctx)
    }
}

config({
    host: "localhost",
    port: 8000,
    apiRootUrl: "/v1",
    interceptors: [myInterceptor],
    api: {
        helloworld: (data, ctx) => "hello world , " + data.name, // http://127.0.0.1:8000/v1/helloworld?name=hero
    },
});

start();