const { config, start } = require('mk-server');
const myConfig = require('./config')
const auth = require('./services/auth')
const db = require('./services/db')
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