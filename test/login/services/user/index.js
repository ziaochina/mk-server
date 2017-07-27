const api = require("./api")
const config = require("./config")

module.exports = {
  name: "user",
  config: config,
  api: api,
  dependencies: ['auth', 'db', 'utils']
}