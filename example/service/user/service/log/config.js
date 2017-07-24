
function config(options) { 
	Object.assign(_options, options)  
	return _options
} 

var _options = config.current = { 
} 

module.exports = config
