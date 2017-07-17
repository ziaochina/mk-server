const config = require('./config');
const api = require('./api');

module.exports = {
	name: "mk-service-user",
	version: "",
	description: "",
	config: config,
	api: api,
  dependencies: ['mk-service-org as orgService', 'utils', 'db', 'cfg'], 
}
