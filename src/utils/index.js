const api = require('./api') 

module.exports = {
    name: "utils",
    apiRootUrl: false,
    config,
    api,
}

api.servicesRouter = function(apiRootUrl, services, authValidator, transactionPromisor){
    return api.router(apiRootUrl, services, authValidator || api.authValidator, transactionPromisor || api.transactionPromisor);
}

var _options = {}

function config(opt){
    if(!opt)return;
    Object.assign(_options, opt);
    init(_options)
}

function init(opt){ 
    
    if(opt.md5 && opt.md5.key){
        api.md5.key = opt.md5.key;
    } 

    if(opt.db){
        api.db = api.orm(opt.db)
    } 

    if(opt.rest){
        api.rest = api.rpc.rest(opt.rest)
    }

    if(opt.dubbo){
        api.dubbo = api.rpc.dubbo(opt.dubbo)
    } 

    if(opt.auth){
        let validator = api.auth; 
        if(opt.auth.key){
            validator.setAuthKey(opt.auth.key);
        } 
        api.authValidator = validator;
    }else{
        api.authValidator = null;
    }

    if(opt.transactionType == "auto"){ 
        api.transactionPromisor =  f => api.db.transaction(f);  //TODO 按DB实现事务。
    }else{
        api.transactionPromisor = null;
    }
  
} 
 