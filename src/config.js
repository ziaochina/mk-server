const config = (options) => {
	Object.assign(current, options)
	initServices();
	initInterceptors();
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

function initInterceptors() {
	var array = current.interceptors;
	current.interceptors = array.map(i => {
		if (typeof i == "function") return i;
		if (typeof i == "string") return Function('obj', 'return obj.' + i)(current);
	})
}

const current = {
	apiRootUrl: "/",
	services: {},
	interceptors: [],
}

module.exports = Object.assign(config, {
	current,
})