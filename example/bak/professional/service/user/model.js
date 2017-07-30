//数据库模型的定义，在DAO文件中使用。
const cfg = require('./config').current 

let User = null 

function model(){
  return model.User();
}

model.User = () => {
  return User = User || cfg.db.import('user', userDefine); 
}

function userDefine(db, DataTypes){
  return db.define("user",{ 
    id: { type: DataTypes.BIGINT, primaryKey: true},
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
  },{
    updatedAt:  false,
    createdAt: 'createtime',
    tableName: 'sys_user', 
  })
}

module.exports = model;