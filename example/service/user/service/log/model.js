//数据库模型的定义，在DAO文件中使用。
const cfg = require('./config').current 
 
let UserLog = null 

exports.UserLog = () => {
  if(!UserLog)UserLog = cfg.db.import('userLog', userLogDefine);
  return UserLog;
} 

function userLogDefine(db, DataTypes){
  return db.define("userLog",{ 
    id: { type: DataTypes.BIGINT, primaryKey: true},
    orgid: DataTypes.BIGINT,
    userid: DataTypes.BIGINT,
    deviceId: DataTypes.BIGINT,
    useragent: DataTypes.STRING,
    osfamily: DataTypes.STRING,
    osname: DataTypes.STRING,
    uafamily: DataTypes.STRING,
    browserversioninfo: DataTypes.STRING,
    uaname: DataTypes.STRING,
    devicetype: DataTypes.STRING,
    uatype: DataTypes.STRING,
    ip: DataTypes.STRING,
    url: DataTypes.STRING,
    pagename: DataTypes.STRING,
    actionname: DataTypes.STRING,
    actiontime: DataTypes.DATE,
    actionResult: DataTypes.STRING,
  },{
    updatedAt:  false,
    createdAt: 'createtime',
    tableName: 'sys_user_log',
  })
}

 