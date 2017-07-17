const Sequelize = require("sequelize")

module.exports = {
  org: {
    id: { type: Sequelize.BIGINT, primaryKey: true},
    name: Sequelize.STRING,
    version: Sequelize.STRING,
    orgType: Sequelize.INTEGER,
  },
  org_config: {
    updatedAt:  false,
    createdAt: 'createtime',
    tableName: 'sys_org',
  }
}
