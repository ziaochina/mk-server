const Sequelize = require("sequelize")
const cls = require('continuation-local-storage')
Sequelize.useCLS(cls.createNamespace('my-own-namespace'))

exports.orm = (dbcfg) => {
  if(!dbcfg)return null;   
  var db = {};
  if(Array.isArray(dbcfg)){ 
    dbcfg.forEach(cfg => {
      db[cfg.name] = newDB(cfg);
    })
  }else{
    db = newDB(dbcfg)
  } 
  return db;
}

function  newDB(cfg){
  return  new Sequelize(cfg.database, cfg.user, cfg.pwd, {
      host: cfg.host,
      port: cfg.port,
      dialect: cfg.type,
    });
}
