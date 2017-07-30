const api = require('./api')
const config = require('./config')

module.exports = {
  name: 'person',
  api,
  config,
  dependencies: ['auth', 'db'],
}