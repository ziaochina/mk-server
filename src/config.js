const config = (options) => {
	Object.assign(current, options)
	initServices();
	return current
}

function initServices() {
	current.services = current.services || {};
	if (current.api && !current.services["mk-server"]) {
		current.services["mk-server"] = {
			apiRootUrl: '/',
			api: current.api,
		}
	}
}

const current = {

}

module.exports = Object.assign(config, {
	current,
})