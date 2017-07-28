const { config, start } = require('mk-server');
const auth = require('./services/auth')
const person = require('./services/person')
const user = require('./services/user')
const userLog = require('./services/user/services/userLog')

config({
    host: "localhost",
    port: 8000,
    apiRootUrl: "/v1",
    services: {
        auth, // apiRootUrl = false 
        person, // http://localhost:8000/v1/pseron/create
        user, // http://localhost:8000/v1/pseron/create
        userLog, // http://localhost:8000/v1/pseron/create
    },
});

auth.config({
    key: "privateKeys",
    tokenKeys: ['userId', 'orgId', 'versionId'],
    exclude: ['/v1/user/login', '/v1/user/create'],
})

start();