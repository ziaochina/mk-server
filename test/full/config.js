
function config(options){
    return Object.assign(config.current, options) 
}

config.current = {
  "host": "localhost",
  "port": 8000,
  "apiRootUrl": "/v1", 
}

module.exports = config; 
 