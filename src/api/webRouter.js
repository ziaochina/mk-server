
const webRouter = (cfg) => {
  if (!cfg) return {}
  let routes = { dir: [], proxy: [] }
  if (typeof cfg == "string") {
    cfg = { "/": cfg }
  }

  buildRouters(cfg, routes)

  return routes
}

function buildRouters(obj, routes, hosts) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    if (key.startsWith("/")) {
      let uri = value.uri || value;
      if (typeof uri == "string" && uri.startsWith("http:")) {
        routes.proxy.push(proxyRouter(key, value, hosts))
      } else {
        routes.dir.push(dirRouter(key, value, hosts))
      }
    }
    else if (key.startsWith("server_name:")) {
      buildRouters(value, routes, key.split("server_name:")[1].split(" "))
    } else {
      throw ("route path mast start with / or http: , current value: " + value)
    }
  })
}

function dirRouter(path, obj, hosts) {
  let directoryPath = obj.path || obj;
  if (path.endsWith("/")) {
    path += "{param*}"
  }
  let route = {
    method: '*',
    path,
    handler: {
      directory: {
        path: directoryPath
      }
    }
  }
  if (obj.method) {
    route.method = obj.method
  }
  if (hosts) {
    route.vhost = hosts
  }
  return route
}

function proxyRouter(path, obj, hosts) {
  let host = obj.host
  let uri = obj.uri || obj
  if (path.endsWith("/")) {
    path += "{path*}"
  }
  if (uri.endsWith("/")) {
    uri += "{path*}"
  }
  let route = {
    method: ["GET", "POST"],
    path,
    handler: {
      proxy: {
        xforward: true,
        passThrough: true,
        host,
        uri,
      }
    }
  }
  if (hosts) {
    route.vhost = hosts
  }
  return route
}

module.exports = webRouter