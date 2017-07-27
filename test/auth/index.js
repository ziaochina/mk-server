const { config, start } = require('./../../src');
const auth = require('./../../src/mk-service-auth')

config({
    host: "localhost",
    port: 8000,
    apiRootUrl: "/v1",
    interceptors: ['services.auth.api.interceptor'],
    services: {
        auth,
        user: {
            api: {
                login: ({ userNam, password }, ctx) => ctx.setToken([100, 200, 300]).return(true),
                create: (dto, ctx) => dto,
                update: (dto, ctx) => ctx.token.userId,
            },
        },
    },
});

auth.config({
    key: "privateKeys",
    tokenKeys: ['userId', 'orgId', 'versionId'],
    exclude: ['/v1/user/login', '/v1/user/create'],
})

start();