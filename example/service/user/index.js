const config = require('./config');
const api = require('./api');

module.exports = {
	name: "mk-service-user",
	version: "",
	description: "",
	config,
	api,
  dependencies: ['mk-service-org as orgService', 'utils', 'db', 'cfg'], 
}
