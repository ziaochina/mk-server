var path = require("path") 

exports.router = routerServices;

function routerServices(apiRootUrl, services, authValidator, transaction) {
  let routes = [];
  Object.keys(services).forEach(key => {
    let service = services[key];
    if (!service.api) return;
    if (service.apiRootUrl === false) return;
    let name = service.name || key;
    let serviceApiUrl = urlJoin(apiRootUrl, service.apiRootUrl || name.replace(/\_/g, '/'));
    let apis = service.api;
    Object.keys(apis).filter(i => typeof apis[i] == "function").forEach(apiName => {
      let handler = apis[apiName];
      let apiUrl = urlJoin(serviceApiUrl, apiName);
      handler._apiUrl = apiUrl;
      console.log(apiUrl);
      routes.push({
        method: 'GET',
        path: apiUrl,
        handler: (request, reply) => wrapper(request, reply, authValidator, transaction, handler, service)
      });
      routes.push({
        method: 'POST',
        path: apiUrl,
        handler: (request, reply) => wrapper(request, reply, authValidator, transaction, handler, service)
      });
    })
  })

  console.log(apiRootUrl || "/");
  routes.push({
    method: 'GET',
    path: apiRootUrl || "/",
    handler: (request, reply) => {
      reply(wsdlHtml(routes.filter(r => r.method == 'POST')))
    }
  });
  return routes;
}

function wsdlHtml(routes) {
  return routes
    .map(r => `<a href='${r.path}'>${r.path}</a>`)
    .join('<br>')
}

function urlJoin(){
  var url = path.join(...arguments); 
  url = url.replace(/\\/g,"/"); 
  return url;
}


function wrapper(request, reply, authValidator, transaction, handler, service) {
  let ctx = context(request, reply, authValidator);
  if (!ctx.validate(handler)) return;
  let promise = transaction || (f => new Promise(resolve => resolve(f())));
  if (transaction && service.config && service.config.current && service.config.current.db) {
    promise = f => service.config.current.db.transaction(f);
  }
  let data = request.payload || request.url.query;
  try {
    promise((t) => handler(data, ctx))
      .then(value => {
        if (value !== undefined) {
          ctx.return(value);
        }
      })
      .catch((e) => {
        return ctx.error(e);
      });
  } catch (e) {
    ctx.error(e);
  } finally {

  }

}

function context(request, reply, authValidator) {
  return Object.assign({
    request,
    reply,
    authValidator,
    res: {},
  },
    contextFun);
}

const contextFun = {
  return: function (value) {
    this.res.result = true;
    this.res.value = value;
    this.reply(this.res);
  },
  error: function (error) {
    this.res.result = false;
    this.res.error = {
      message: error.message,
      code: error.code,
      stack: error.stack
    };
    this.reply(this.res);
  },
  token: function (json, authType) {
    authType = authType || "base"
    if (json === undefined) {
      return this.tokenInHeader;
    } else {
      this.res.token = this.authValidator && this.authValidator[authType].getToken(json) || json;
    }
    return this;
  },
  validate: function (handler) {
    if (!this.authValidator) return true;
    let authType = handler.authType || "base";
    let apiUrl = handler.apiUrl;
    if (!this.request.headers.token && this.authValidator[authType].exclude(apiUrl)) {
      this.error({
        code: '402',
        message: '未登录'
      });
      return false;
    } else {
      try {
        this.tokenInHeader = this.authValidator[authType].getJson(this.request.headers.token || "");
      } catch (ex) {
        this.error({
          code: '402',
          message: '未登录'
        });
      }
      return true;
    }
  }
}