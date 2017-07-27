const options = require('./config').current;
const Sequelize = require("sequelize")
const cls = require('continuation-local-storage')
Sequelize.useCLS(cls.createNamespace('my-own-namespace'))

const api = {
    currentDB: null,
}

const dbs = {}

const init = () => {

    api.currentDB = dbs.currentDB = dbs[options.name] = newDB(options);

    if (Array.isArray(options.dbs)) {
        options.dbs.filter(d => !dbs[d.name]).forEach(d => {
            dbs[d.name] = newDB(d);
        })
    }
}

const newDB = (cfg) => new Sequelize(cfg.database, cfg.user, cfg.pwd, {
    host: cfg.host,
    port: cfg.port,
    dialect: cfg.type,
});


const interceptor = (ctx) => {
    var currentDB = null;
    var transactionType = ctx.handler.transactionType ||
        ctx.service.config && ctx.service.config.current &&
        (ctx.service.config.current.transactionType || (currentDB = ctx.service.config.current.db) && ctx.service.config.current.db.transactionType) ||
        options.transactionType;

    currentDB = currentDB || dbs.currentDB;

    if (currentDB && transactionType == "auto" && !ctx._handler) {
        var transactionWrapper = (data, ctx) => currentDB.transaction((t) => ctx._handler(data, ctx));
        ctx._handler = ctx.handler;
        ctx.handler = transactionWrapper;
        Object.assign(transactionWrapper, ctx._handler);
    }

    return true;
}



module.exports = Object.assign(api, {
    dbs,
    init,
    interceptor,
});