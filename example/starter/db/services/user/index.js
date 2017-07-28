const api = require("./api")
const config = require("./config")

module.exports = {
  name: "user",
  api,
  config,
  dependencies: ['auth', 'db'],
}