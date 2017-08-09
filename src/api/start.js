const Hapi = require('hapi');
const options = require('./../config').current;
const { router } = require('./router');

function start(cb) {

    let { host, port, website, apiRootUrl, services, interceptors, proxy } = options;

    //创建Web服务进程
    var webServer = new Hapi.Server();
    webServer.connection({
        host,
        port,
        state: {
            strictHeader: false, //不验证cookie
        },
    });

    //静态文件
    if (website) {
        console.log("website path: " + website)
        // https://github.com/hapijs/inert
        webServer.register(require('inert'), (err) => {
            if (err) {
                throw err;
            }
            webServer.route({
                method: 'GET',
                path: '/{param*}',
                handler: {
                    directory: {
                        path: website
                    }
                }
            });
        });
    }

    if (proxy && Object.keys(proxy).length > 0) {
        console.log("proxy path: " + JSON.stringify(proxy))
        // https://github.com/hapijs/h2o2
        webServer.register(require("./../lib/h2o2/lib"), (err) => {
            if (err) {
                throw err;
            }
            let proxyRoutes = []
            Object.keys(proxy).forEach(p => {
                proxyRoutes.push({
                    method: "*",
                    path: p,
                    handler: {
                        proxy: {
                            uri: proxy[p]
                        }
                    }
                }) 
            })
            webServer.route(proxyRoutes);
        }); 
    }

    //绑定本地API的URL路径
    let routes = router(apiRootUrl, services, interceptors);

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