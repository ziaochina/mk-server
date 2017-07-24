const utils = require('./utils') 
const config = require('./config')

const Hapi = require('hapi');
  
module.exports = {
  name: "mk-server",
  config,
  api:{ 
    start,
    utils,
  }
} 

var options = config.current; 

function start(cb){ 
  let apiRootUrl = options && options.apiRootUrl || '';  
 
  //绑定本地API的URL路径
  let routes = utils.api.servicesRouter(apiRootUrl, options.services) ;

  //创建Web服务进程
  this.webServer = new Hapi.Server();
  this.webServer.connection({
      host: options.host,
      port: options.port,
      state:{
        strictHeader: false,
      },
  });

  //静态文件
  if(options.website){
    this.webServer.register(require('inert'), (err) => {
        if (err) {
            throw err;
        }
        this.webServer.route({
          method: 'GET',
          path: '/{param*}',
          handler: {
              directory: {
                  path: options.website
              }
          }
      });
    });
  }

  //设置api的url
  this.webServer.route(routes); 

  //启用web服务
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


//未处理的异常
process.on('uncaughtException', function (err) {
    console.error('An uncaught error occurred!' + err.message);
    console.error(err.stack);
});
