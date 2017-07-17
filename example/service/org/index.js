const config = require('./config');
const api = require('./api');

module.exports = {
	name: "mk-service-org",
	version: "",
	description: "",
	config: config,
	api: api,
  dependencies: ['db'],
}
