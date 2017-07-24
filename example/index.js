const {config, api:{start, utils}} = require("../src")
//const {config, start, utils} = require("mk-server")
const myConfig = require("./config")  
const user = require("./service/user") 
const user_log = require("./service/user/service/log") 

const services = {
    [utils.name]: utils,   
    [user.name]: user, 
    [user_log.name]: user_log, 
}

services.config = function(options){ 
    Object.keys(this).forEach(k=> { 
        if(!this[k].config)return;
        let curCfg = Object.assign({}, options["*"], options[k])
        this[k].config(curCfg);  
    })
}

services.config({"*": {services}})

config(myConfig({services}))

start()