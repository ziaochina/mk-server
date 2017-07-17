const models = require('./model')
const config = require('./config')

let api = config.getCurrent();
let sequelize = null;
let Org = null

exports._init = () => {
  sequelize = api.db;
  Org = sequelize.define('org', models.org, models.org_config)
}

exports.findById = (id) => {
    return Org.findById(id)
}

exports.findByUser = (user) => {
    return Org.findOne({ where: {name: user} })
}
