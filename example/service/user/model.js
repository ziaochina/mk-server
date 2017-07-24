//数据库模型的定义，在DAO文件中使用。
const cfg = require('./config').current 

let User = null
let UserLog = null 

exports.User = () => {
  var db = cfg.services.utils.api.db
  if(!User)User = db.import('user', userDefine);
  return User;
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

 