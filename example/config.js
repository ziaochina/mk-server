
function config(options) { 
	Object.assign(_options, options) 
	_options.services.config({ 
    utils: {
      md5: {key: "yiJia9*"},
      auth: {key: "rrtimes.com/login/token/Key"},
      transactionType: "auto",
      // rpc: {
      //   dubbo:{
      //     "apiPrefix": "dubbo",
      //     "application": {
      //       "name": "xr-service"
      //     },
      //     "register": "192.168.1.209:2181",
      //     "dubboVer": "2.8.4a",
      //     "group": 'LISGA-PC',
      //     "timeout": 6000,
      //   },
      //   rest: {
      //     "apiPrefix": "rest",
      //     "serverUrl": "http://dev.rrtimes.com:8088",
      //   },
      // },
      db: {
        type: "mysql",
        user: "root",
        pwd: "rrsd_2016",
        host: "mysql.rrtimes.com",
        port: 30200,
        database: "dbmanage_dev",
      }
    },
	})  
  return _options
} 

var _options = config.current = {
  host: 'localhost',
  port: 8000,
  apiRootUrl: '/v1',
  website: "./www",
} 

module.exports = config
