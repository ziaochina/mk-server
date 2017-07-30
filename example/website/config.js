/**
 * server配置
 * 
 */

const config = ({ services }) => {
    Object.assign(current.services, services)
    configServices(current)
    return current
}

const current = {
    host: "0.0.0.0",
    port: 8000,
    apiRootUrl: "/v1",
    website: "www",
    interceptors: [],
    services: {
        // referrenced service
    },
    configs: {
        // serviceName: {}
    },
}

function configServices(server) {
    var { services, configs } = server;
    Object.keys(services).filter(k => !!services[k].config).forEach(k => {
        let curCfg = Object.assign({ server }, configs["*"], configs[k]);
        services[k].config(curCfg);
    })
}

module.exports = Object.assign(config, {
    current,
})
