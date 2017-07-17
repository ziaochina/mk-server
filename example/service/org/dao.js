const models = require('./model')

let api = {
  db: true
}
let sequelize = null;
let Org = null

exports._init = (inject) => {
  inject(api)

  sequelize = api.db;
  Org = sequelize.define('org', models.org, models.org_config)
}

exports.findById = (id) => {
    return Org.findById(id)
}

exports.findByUser = (user) => {
    return Org.findOne({ where: {name: user} })
}
