const Hapi = require('hapi');
const inert = require('inert');
const options = require('./../config').current;
const { router } = require('./router');

function start(cb) {

    let { host, port, website, apiRootUrl, services, interceptors } = options;

    //绑定本地API的URL路径
    let routes = router(apiRootUrl, services, interceptors);

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
    website && this.webServer.register(inert, (err) => {
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