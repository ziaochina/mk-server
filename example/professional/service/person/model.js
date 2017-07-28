//数据库模型的定义，在DAO文件中使用。
const cfg = require('./config').current 
 
let Person = null 

function model(){
  return model.Person();
}

model.Person = () => { 
  Person = Person || cfg.db.import('person', personDefine);
  return Person;
}

function personDefine(db, DataTypes){
  return db.define("person",{ 
    id: { type: DataTypes.BIGINT, primaryKey: true},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
  },{
    updatedAt:  false,
    createdAt: 'createtime',
    tableName: 'set_person', 
  })
}

module.exports = model;