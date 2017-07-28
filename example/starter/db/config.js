
const config = (options) => {
    Object.assign(current, options);
    configServices();
    return current;
}

const current = {
    host: "localhost",
    port: 8000,
    apiRootUrl: "/v1",
    interceptors: ['services.auth.api.interceptor', 'services.db.api.interceptor'],
    services: {},
    configs: {
        auth: {
            key: "privateKeys",
            tokenKeys: ['userId', 'orgId', 'versionId'],
            exclude: ['/v1/user/login', '/v1/user/create'],
        },
        db: {
            name: "bizdata",
            type: "mysql",
            user: "root",
            pwd: "mydbpassword",
            host: "localhost",
            port: 30200,
            database: "bizdata_dev",
        }
    },
}

function configServices() {
    var { services, configs } = current;
    Object.keys(services).filter(k => !!services[k].config).forEach(k => {
        let curCfg = Object.assign({ services }, configs[k]);
        services[k].config(curCfg);
    })
}



module.exports = Object.assign(config, {
    current,
})