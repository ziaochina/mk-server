//Sequelize操作数据库的代码实现，SQL语句保存在mapper中，不在本文件中，Sequelize 中文API文档 https://itbilu.com/nodejs/npm/N1yrA4HQW.html
//const Sequelize = require("sequelize")
const models = require('./model')
const mapper = require('./mapper')

exports._init = (inject) => {
  inject(models);
}

exports.create = (dto) => models.Scene.create(dto,{include: [models.Operates]});

exports.createOperate = (dto) => models.Operate.create(dto);

exports.findByName = (name)=> models.Scene.findOne({where: {name: name}});

exports.findAll = (where)=> models.Scene.findAll(where);

exports.findById = (id)=> models.Scene.findById(id);
