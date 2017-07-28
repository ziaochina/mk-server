const { config, start } = require('./../../src');
const myConfig = require('./config')
const auth = require('./../../src/mk-service-auth')
const db = require('./../../src/mk-service-db')
const person = require('./services/person')
const user = require('./services/user')

config(myConfig({
    services: {
        auth,
        db,
        person,
        user,
    },
}));

start();