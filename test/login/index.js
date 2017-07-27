//genorate by mk-tool , command: mk complite server
const { config, start, utils } = require('./../../src');
const serverConfig = require('./config');
const auth = require('./services/auth')
const db = require('./services/db') 
const user = require('./service/user');
const services = {
    [utils.name]: utils,
    [auth.name]: auth,
    [db.name]: db,
    [user.name]: user,
}

services.config = function (options) {
    Object.keys(this).filter(k => typeof this[k].config == "function").forEach(k => {
        let curCfg = Object.assign({}, options["*"], options[k])
        this[k].config(curCfg);
    })
}

services.config({ "*": { services } })

config(serverConfig({ services }))

start();