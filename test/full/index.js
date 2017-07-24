const {config, start, utils} = require('./../../src');
const myConfig = require('./config');
const user = require('./service/user');
const services = {
    [utils.name]:utils,
    [user.name]:user,
}

services.config = function(options){ 
    Object.keys(this).filter(k => typeof this[k].config == "function").forEach(k=> {  
        let curCfg = Object.assign({}, options["*"], options[k])
        this[k].config(curCfg);  
    })
}

services.config({"*": {services}})

config(myConfig({services}))

start();