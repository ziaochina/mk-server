const Hapi = require('hapi');
const options = require('./../config').current;
const apiRouter = require('./apiRouter');
const webRouter = require('./webRouter');

function start(cb) {

    let { host, port, website, apiRootUrl, services, interceptors } = options;
    
    if (services && services._delayStart === true) {
        services._start = start
        return
    }

    //创建Web服务进程
    var webServer = new Hapi.Server();
    webServer.connection({
        host,
        port,
        state: {
            strictHeader: false, //不验证cookie
        },
    });


    let { dir, proxy } = webRouter(website);

    //静态文件  // https://github.com/hapijs/inert
    if (dir && dir.length) {
        dir.forEach(i => console.log("website path: " + i.path + " \t=>\t " + i.handler.directory.path))
        webServer.register(require('inert'), (err) => {
            if (err) {
                throw err;
            }
            webServer.route(dir);
        });
    }

    //反向代理  // https://github.com/lishengguo/h2o2
    if (proxy && proxy.length) {
        proxy.forEach(i => console.log("proxy path: " + i.path + " \t=>\t " + i.handler.proxy.uri))
        webServer.register(require("./../lib/h2o2/lib"), (err) => {
            if (err) {
                throw err;
            }
            webServer.route(proxy);
        });
    }


    //绑定本地API的URL路径
    let routes = apiRouter(apiRootUrl, services, interceptors);

    //设置api的url
    webServer.route(routes);

    //启用web服务
    webServer.start((err) => {
        if (cb) {
            cb(err, webServer)
        }
        else if (err) {
            throw err;
        }
        console.log('Server running at:', webServer.info.uri);
    });
}

module.exports = start;