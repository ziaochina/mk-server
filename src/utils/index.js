const api = require('./api') 

module.exports = {
    name: "utils",
    apiRootUrl: false,
    config,
    api,
}
 
var _options = {}

function config(opt){ 
    Object.assign(_options, opt); 
    if(opt.md5 && opt.md5.key){
        api.md5.key = opt.md5.key;
    }  
    return _options;
}
 
 