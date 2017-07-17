const rp = require('request-promise');
const nzd = require('node-zookeeper-dubbo');
const java = require('js-to-java');

exports.rpc = (remote, cfg) => {
  let proviers = {};
  let restPrefix = cfg && cfg.rest && cfg.rest.apiPrefix ;
  let dubboPrefix = cfg && cfg.dubbo && cfg.dubbo.apiPrefix ;
  let rest = restWrapper(remote.rest, cfg && cfg.rest);
  let dubbo = dubboWrapper(remote.dubbo, cfg && cfg.dubbo);
  if(restPrefix){
    proviers[restPrefix] = rest;
  }else{
    proviers = Object.assign(providers, rest);
  }
  if(dubboPrefix){
    proviers[dubboPrefix] = dubbo;
  }else{
    proviers = Object.assign(providers, dubbo);
  }
  return proviers
}

const restWrapper = (apis, restcfg, apiProxy, serverUrl) => {
  if(!restcfg)return;
  apiProxy = apiProxy || {};
  serverUrl = serverUrl || restcfg && restcfg.serverUrl;
  for (let key in apis) {
    if (!apis.hasOwnProperty(key))continue;
    let api = apis[key];
    if(key == '_serverUrl'){
      serverUrl = api;
    }
    else if(api && typeof api == "object"){
      restWrapper(api, restcfg, apiProxy[key] = {}, serverUrl)
    }
    else if(typeof api == "function"){
      apiProxy[key] = restApiProxy(apis[key], serverUrl)
    }
  }
  return apiProxy;
}
const restApiProxy = (fun, serverUrl) => {
  return function () {
    let args = Array.from(arguments);
    args.unshift((url, data)=>{
      let headers = {}
      let ctx = args[args.length-1];
      if(ctx && ctx.res && ctx.res.token){
        headers.token = ctx.res.token;
      }
      else if(ctx && ctx.request && ctx.request.headers.token){
        headers.token = ctx.request.headers.token;
      }
      return rp({
        method: 'POST',
        uri: serverUrl + url,
        headers: headers,
        body: data,
        json: true,
      })
    })
    return fun.apply(null, args);
  }
}

const dubboWrapper = (apis, cfg) => {
  if(!cfg)return;
  let opt = Object.assign({}, cfg, {
    java: java,
    dependencies : apis,
  });
  return new nzd(opt);
}
