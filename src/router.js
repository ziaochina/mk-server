
exports.router = resolveApiPath;

function resolveApiPath(path, api, auth, transaction, routes){
  routes = routes || [];
  for (let key in api) {
    let method = api[key];
    let methodPath = path + '/' + key;
    if (!api.hasOwnProperty(key) || !!key && key.toString()[0]=="_"){
      continue;
    }
    else if (typeof method == "object"){
      resolveApiPath(methodPath, method, auth, transaction, routes)
    }
    else if (typeof method == 'function'){
      //method.url = methodPath;
      console.log(methodPath);
      routes.push({
          method: 'GET',
          path: methodPath,
          handler: (request, reply) => wrapper(request, reply, auth, transaction, method)
      });
      routes.push({
          method: 'POST',
          path: methodPath,
          handler: (request, reply) => wrapper(request, reply, auth, transaction, method)
      });
    }
  }
  routes.push({
      method: 'GET',
      path: path || "/",
      handler: (request, reply) => {
        reply(routes.filter(r => r.method=='POST')
          .map(r => `<a href='${r.path}'>${r.path}</a>`)
          .join('<br>')
        )
      }
  });
  return routes;
}

function wrapper(request, reply, auth, transaction, handler){
  let ctx = context(request, reply, auth);
  if(!ctx.validate(handler)) return;
  let promise = transaction || (f => new Promise(resolve => resolve(f())));
  let data = request.payload || request.url.query;
  try {
    promise((f) => handler(data, ctx))
    .then(value => {
      if(value !== undefined){
        ctx.return(value);
      }
    })
    .catch((e)=>{
      return ctx.error(e);
    });
  } catch (e) {
    ctx.error(e);
  } finally {

  }

}

function context(request, reply, auth){
  return Object.assign(
  {
    request,
    reply,
    auth,
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
  error: function(error) {
    this.res.result = false;
    this.res.error = error;
    this.reply(this.res);
  },
  token: function(json, authType) {
    authType = authType || "base"
    if(json === undefined){
      return this.tokenInHeader;
    }else{
      this.res.token = this.auth && this.auth[authType].getToken(json) || json;
    }
    return this;
  },
  validate: function(handler) {
    if(!this.auth)return true;
    if(!this.request.headers.token && handler.auth !== false){
      this.error("未登录");
      return false;
    }else{
      let authType = handler.auth || "base";
      try{
        this.tokenInHeader = this.auth && this.auth[authType].getJson(this.request.headers.token || "");
      }catch(ex){
        this.error("未登录");
      }
      return true;
    }
  }
}
