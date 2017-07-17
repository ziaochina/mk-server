const Sequelize = require("sequelize")
const cls = require('continuation-local-storage')
Sequelize.useCLS(cls.createNamespace('my-own-namespace'))

exports.orm = (dbcfg) => {
  if(!dbcfg)return null;
  return new Sequelize(dbcfg.database, dbcfg.user, dbcfg.pwd, {
   host: dbcfg.host,
   dialect: dbcfg.type,
 });
}
