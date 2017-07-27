
function config(options) {
  options.services.config({
    utils: {
      md5: {
        key: "yiJia9*"
      },
    },
    auth: {
      key: "rrtimes.com/login/token/Key",
      token: ['userId', 'orgId', 'versonId', 'appId'],
      exclude: ['/user/login', '/user/ping', '/user/create'],
    },
    db: {
      name: "dbmanage",
      type: "mysql",
      user: "root",
      pwd: "rrsd_2016",
      host: "mysql.rrtimes.com",
      port: 30200,
      database: "dbmanage_dev",
    },
  })
  return Object.assign(config.current, options)
}

config.current = {
  host: "localhost",
  port: 8000,
  apiRootUrl: "/v1",
  interceptors: ['services.auth.api.interceptor', 'services.db.api.interceptor'],
}

module.exports = config;
