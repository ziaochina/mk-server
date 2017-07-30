const {config, api:{start, utils}} = require("../src")
//const {config, start, utils} = require("mk-server")
const myConfig = require("./config")  
const person = require("./service/person") 
const user = require("./service/user") 
const user_log = require("./service/user/service/log") 

const services = {
    [utils.name]: utils,   
    [person.name]: person, 
    [user.name]: user, 
    [user_log.name]: user_log, 
}

services.config = function(options){ 
    Object.keys(this).filter(k => !!this[k].config).forEach(k=> { 
        let curCfg = Object.assign({}, options["*"], options[k])
        this[k].config(curCfg);  
    })
}
// services.assign = function(names, target = {}){ 
//     names.filter(name => this[name] && this[name].api).forEach(name =>{
//         target[name] = target[name] || {}
//         Object.assign(target[name], this[name].api); 
//     }) 
//     return target;
// }

services.config({"*": {services}})

config(myConfig({services}))

start()