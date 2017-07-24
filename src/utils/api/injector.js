
exports.injector = (apis, defaultProvider, initMethodName) => {
  let inject = (consumer, provider) => {
    provider = provider || defaultProvider
    if (!consumer) return provider;
    if (typeof consumer[initMethodName] == 'function'){
      return consumer[initMethodName](inject)//consumer 有初始化方法，调用并退出
    }

    for (let key in consumer) {
      if (!consumer.hasOwnProperty(key)) continue;
      let api = consumer[key];
      if (Array.isArray(consumer)){ //注入数组中的各对象
        inject(api, provider);
        continue;
      }
      let apiProvider = provider[key];
      if (!apiProvider || typeof apiProvider != "object") throw("未找到依赖的api: " + key);
      if (api === true){ //注入值为true的属性
        consumer[key] = apiProvider;
      }
      else if (api && typeof api == "object"){ //注入子对象
        inject(api, apiProvider)
      }
    }
    return consumer;
  }

  let init = (apis) => {
      for (let key in apis) {
        let api = apis[key];
        if (!apis.hasOwnProperty(key)) continue;
        if (!api || typeof api != "object") continue;
        if (typeof api[initMethodName] == 'function'){
          api[initMethodName](inject)//执行初始化方法
        }
        init(api);
      }
  }

  init(apis);
}
