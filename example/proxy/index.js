const { config, start } = require("mk-server")
const serverConfig = require("./config")

const services = {
}

config(serverConfig({ services }))

start()