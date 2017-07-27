const path = require("path")
const wsdl = require("./wsdl")

//处理全部服务的api与url绑定。
const router = (apiRootUrl, services, interceptors) => {
  let routes = [];
  Object.keys(services).forEach(key => {
    let service = services[key];
    let apis = service.api;
    if (!apis || service.apiRootUrl === false) return;

    let name = service.name || key;
    let serviceApiUrl = urlJoin(apiRootUrl, service.apiRootUrl || name.replace(/\_/g, '/'));

    //服务的api绑定到对应的url上。
    Object.keys(apis).filter(i => typeof apis[i] == "function").forEach(apiName => {  
      let handler = apis[apiName];
      let apiUrl = urlJoin(serviceApiUrl, apiName);

      console.log(apiUrl);
      routes.push({
        method: 'GET',
        path: apiUrl,
        handler: (request, reply) => handlerWrapper(context({ request, reply, interceptors, apiUrl, handler, service }))
      });
      routes.push({
        method: 'POST',
        path: apiUrl,
        handler: (request, reply) => handlerWrapper(context({ request, reply, interceptors, apiUrl, handler, service }))
      });
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
        message: ex.message,
        code: ex.code,
        stack: ex.stack,
      };
      ctx.reply(ctx.resBody);
    }
  });
}

function handlerWrapper(ctx) {

  let data = ctx.request.payload || ctx.request.url.query;

  let array = ctx.interceptors
  if (array && Array.isArray(array)) {
    for (var i = 0; i < array.length; i++) {
      if (array[i](ctx) === false) return false; //拦截器返回false终止执行。
    }
  }

  try {
    var value = ctx.handler(data, ctx);  //无返回值时，表示handler异步调用ctx.return或ctx.error。
    if (value !== undefined) {
      ctx.return(value);
    }
  } catch (ex) {
    ctx.error(ex);
  }

}

module.exports = {
  router,
} 