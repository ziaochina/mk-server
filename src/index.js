const auth = require('./auth')
const env = require('./env')
const injector = require('./injector')
const md5 = require('./md5')
const orm = require('./orm')
const router = require('./router')
const rpc = require('./rpc')

const Hapi = require('hapi');

const utils = Object.assign({},
  auth,
  env,
  injector,
  md5,
  orm,
  router,
  rpc
);

module.exports = function(){

  this.config = function({config, services, remote}){
    config = config || {};
    services =  services || {};
    let server = this;
    //this.initMethodName = config.service && config.service.initMethodName || '_init';
    let apiRootUrl = config && config.apiRootUrl || '';
    let localproviders = resolveService(services);//本地的服务提供者
    let rpc = remote && utils.rpc(remote, config.rpc);//RPC 远程的服务提供者
    let db = config.db && utils.orm(config.db);//ORM 持久化组件

    let providers = Object.assign( //服务提供者
      {
        cfg: config,
        db,
        utils,
      },
      rpc,
      localproviders
    );

    let authMethod = null;
    //config auth db
    if(config.service && config.service.auth ){ //不启用身份验证
      authMethod = utils.auth;
      if(config.service.authKey){
        authMethod.setAuthKey(config.service.authKey);
      }
    }
    let transactionMethod = null;
    if(config.db && config.db.transactionType == "auto"){ //不启用数据库事务
      transactionMethod = f => db.transaction(f);
    }

    //config all services
    configService(providers);

    //init all services
    initService(providers);

    //注入服务提供者
    //utils.injector(services, providers, initMethodName);

    //绑定本地API的URL路径
    let routes = utils.router(apiRootUrl, services, authMethod, transactionMethod) ;


    //创建并启动Web服务进程
    this.webServer = new Hapi.Server();
    this.webServer.connection({
       host: config.host,
       port: config.port,
    });

    //静态文件
    if(config.website){
     this.webServer.register(require('inert'), (err) => {
         if (err) {
             throw err;
         }
         this.webServer.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: config.website
                }
            }
        });
     });
    }

    this.webServer.route(routes);
  }

  this.start = function(cb){
   this.webServer.start((err) => {
      if(cb){
          cb(err, server)
      }
      else if (err) {
           throw err;
       }
       console.log('Server running at:', this.webServer.info.uri);
   });
  }

  return this;
}

function configService(services){
  let options = {services};
  for (let key in services) {
    if (!services.hasOwnProperty(key)) continue;
    let service = services[key];
    if(service && typeof service.config == "function"){
      let reference = {};
      let deps = service.dependencies;
      deps && deps.map && deps.map(dep => {
        let serviceName = dep.split(' as ')[0];
        let alias = dep.split(' as ')[1] || serviceName;
        reference[alias] = services[serviceName].api || services[serviceName];
      })
      service.config(options, reference);
    }
  }
}

function initService(services){
  for (var key in services) {
    if (!services.hasOwnProperty(key)) continue;
    var service = services[key];
    if(service && service.api && typeof service.api._init == "function"){
      service.api._init();
    }
  }
}

function resolveService(services, providers){
  providers = providers || {};
  for (var key in services) {
    let service = services[key];
    if (!services.hasOwnProperty(key)) continue;
    if (service.name && service.api){
      providers[service.name] = service;
    }
    if (service != null && typeof service == "object"){
      resolveService(service, providers);
    }
  }
  return providers;
}

//未处理的异常
process.on('uncaughtException', function (err) {
    console.error('An uncaught error occurred!' + err.message);
    console.error(err.stack);
});
