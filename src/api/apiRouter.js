const path = require("path")
const wsdl = require("./wsdl")

//处理全部服务的api与url绑定。
const apiRouter = (apiRootUrl, services, interceptors) => {
  let routes = [];
  Object.keys(services).forEach(key => {
    let service = services[key];
    let apis = service.api;
    if (!apis || service.apiRootUrl === false) return;

    let name = service.name || key;
    let serviceApiUrl = urlJoin(apiRootUrl, service.apiRootUrl || name.replace(/\_/g, "/"));

    //服务的api绑定到对应的url上。
    Object.keys(apis).filter(i => typeof apis[i] == "function" && i[0] != "_").forEach(apiName => {
      let handler = apis[apiName];
      let apiUrl = urlJoin(serviceApiUrl, apiName);

      let urls = [apiUrl]
      if (handler.apiUrl) {
        if (handler.apiUrl.indexOf(",") != -1) {
          urls = apiUrl.split(",").map(url => urlJoin(apiRootUrl, url))
        } else {
          apiUrl = urlJoin(apiRootUrl, handler.apiUrl);
          urls = [apiUrl]
        }
      }
      else if (handler.apiUrl === false) {
        return
      }

      console.log(`api path:  ${apiUrl} \t\t=>\t ${service.name}.api.${apiName}`);
      urls.forEach(url => routes.push({
        method: ["GET", "POST"],
        path: url,
        handler: (request, reply) => handlerWrapper(context({ request, reply, interceptors, apiUrl: url, handler, service }))
      }))
    })
  })

  wsdl(apiRootUrl, routes);//生成api描述文档

  return routes;
}

function urlJoin() {
  return path.join(...arguments).replace(/\\/g, "/");
}

function context(ctx) {
  return Object.assign(ctx, {
    resBody: {},
    return: (value) => {
      ctx.resBody.result = true;
      ctx.resBody.value = value;
      ctx.reply(ctx.resBody);
    },
    error: (ex) => {
      ctx.resBody.result = false;
      ctx.resBody.error = {
        message: ex.message || ex,
        code: ex.code,
        stack: ex.stack,
      };
      ctx.reply(ctx.resBody);
      console.error(ctx.resBody.error)
    }
  });
}

function handlerWrapper(ctx) { 
  let request = ctx.request
  let data = null
  if (request.method == "get") {
    data = Object.assign({}, request.url.query);
  } else {
    data = request.payload
  }
  
  let array = ctx.interceptors
  if (array && Array.isArray(array)) {
    for (var i = 0; i < array.length; i++) {
      if (array[i](ctx) === false) return false; //执行拦截器，如果返回false终止执行。
    }
  }

  try {
    var value = ctx.handler(data, ctx);  //执行handler，无返回值时，表示handler异步调用ctx.return或ctx.error。
    var promise = value;
    if (promise instanceof Promise || promise && promise.catch && promise.then) {
      promise
        .then(ctx.return)
        .catch(ctx.error)
    }
    else if (value !== undefined) {
      ctx.return(value);
    }
  } catch (ex) {
    ctx.error(ex);
  }

}

module.exports = apiRouter
