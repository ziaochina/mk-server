const config = require('./config')
const api = require('./api')

module.exports = {
    name: "mk-service-db",
    version: "",
    description: "",
    author: "lsg",
    config: (options) => {
        config(options);
        api.init();
    },
    apiRootUrl: false,
    api,
}