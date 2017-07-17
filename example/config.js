module.exports = {
  "host": "localhost",
  "port": 8000,
  "apiRootUrl": "/v1",
  "website": "./www",
  service: {
    "auth": true,
    "authKey": "/login/token/Key",
    "md5key": "yiJia9*",
    "initMethodName": "_init",
    "transactionType": "auto",
  },
  rpc: {
    dubbo:{
      "apiPrefix": "dubbo",
      "application": {
        "name": "xr-service"
      },
      "register": "192.168.1.209:2181",
      "dubboVer": "2.8.4a",
      "group": 'LISGA-PC',
      "timeout": 6000,
    },
    rest: {
      "apiPrefix": "rest",
      "serverUrl": "http://dev.rrtimes.com:8088",
    },
  },
  db: {
    "type": "mysql",
    "user": "root",
    "pwd": "rrsd_2016",
    "host": "192.168.1.201",
    "port": 3306,
    "database": "dbmanage_dev",
  }
}
