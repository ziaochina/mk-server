const { config, start } = require("mk-server")
const serverConfig = require("./config")

const user = require("./services/user/index.js")


const services = {

    user,

}


config(serverConfig({ services }))

start()