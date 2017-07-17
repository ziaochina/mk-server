//Sequelize操作数据库的代码实现，SQL语句保存在mapper中，不在本文件中， Sequelize 中文API文档 https://itbilu.com/nodejs/npm/N1yrA4HQW.html
//const Sequelize = require("sequelize")
const models = require('./model')
const mapper = require('./mapper')
const config = require('./config')

let api = config.getCurrent();

let User = null;
let Log = null;

exports._init = () => {
  models._init();
  User = models.User;
  Log = models.Log;
}

exports.log = (arr)=>{
    return Log.bulkCreate(arr);
}

exports.findByMobile = (mobile)=>{
    return User.findOne({ where: {mobile: mobile} })
}

exports.findByEmail = (email)=>{
    return User.findOne({ where: {email: email} })
}

exports.countByAppId = () => api.db.query(mapper.countByAppId,{type: sequelize.QueryTypes.SELECT});
