
function config(options) { 
	Object.assign(_options, options)  
	_options.db = _options.services.utils.api.db && _options.services.utils.api.db.dbmanage
	return _options
} 

var _options = config.current = { 
} 

module.exports = config
