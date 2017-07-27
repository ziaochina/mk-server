const { config, start } = require('./../../src');
const db = require('./../../src/mk-service-db')

config({
    host: "localhost",
    port: 8000,
    apiRootUrl: "/v1",
    interceptors: [db.interceptor],
    services: {
        db,
        user: {
            api: {
                login: ({ userNam, password }, ctx) => ctx.token([100, 200, 300]).return(true),
                create: (dto, ctx) => dto,
                update: (dto, ctx) => [ctx.userId, ctx.orgId, ctx.versionId],
            },
        },
    },
});

db.config({
    name: "bizdata",
    type: "mysql",
    user: "root",
    pwd: "mydbpassword",
    host: "localhost",
    port: 30200,
    database: "bizdata_dev",
});

start();