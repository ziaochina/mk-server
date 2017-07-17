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

module.exports = function(config, service, remote){
  var server = this;
  this.cfg = config || {};
  this.initMethodName = this.cfg.service && this.cfg.service.initMethodName || '_init';
  this.apiRootUrl = this.cfg && this.cfg.apiRootUrl || '';
  this.consumer =  service || {};
  this.remote = remote;
  this.localproviders = service;//本地的服务提供者
  this.rpc = this.remote && utils.rpc(this.remote, this.cfg.rpc);//RPC 远程的服务提供者
  this.db = this.cfg.db && utils.orm(this.cfg.db);//ORM 持久化组件

  this.providers = Object.assign( //服务提供者
    {
      cfg: this.cfg,
      db: this.db,
      utils: utils,
    },
    this.rpc,
    this.localproviders
  );

  if(!this.cfg.service || this.cfg.service.auth == false){ //不启用身份验证
    this.auth = null;
  }else{
    this.auth = utils.auth;
    if(this.cfg.service.authKey){
      this.auth.setAuthKey(this.cfg.service.authKey);
    }
  }

  if(!this.cfg.db || this.cfg.db.transactionType != "auto"){ //不启用数据库事务
    this.transaction = null;
  }else{
    this.transaction = f => this.providers.db.transaction(f);
  }

   //注入服务提供者
   utils.injector(this.consumer, this.providers, this.initMethodName);

   //绑定本地API的URL路径
   let routes = utils.router(this.apiRootUrl, this.consumer, this.auth, this.transaction) ;


   //创建并启动Web服务进程
   this.webServer = new Hapi.Server();
   this.webServer.connection({
       host: this.cfg.host,
       port: this.cfg.port,
   });

   //静态文件
   if(this.cfg.website){
     this.webServer.register(require('inert'), (err) => {
         if (err) {
             throw err;
         }
         this.webServer.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: this.cfg.website
                }
            }
        });
     });
   }

   this.webServer.route(routes);

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

//未处理的异常
process.on('uncaughtException', function (err) {
    console.error('An uncaught error occurred!' + err.message);
    console.error(err.stack);
});
