//数据库模型的定义，在DAO文件中使用。
const Sequelize = require("sequelize")

let api = {db: true};

let Scene = null;
let Operate = null;
let Operates = null;

exports._init = function(inject){
  inject(api);

  Scene = api.db.define('scene', cfg.scene, cfg.scene_config);
  Operate = api.db.define('operate', cfg.operate, cfg.operate_config);
  Operates = Scene.hasMany(Operate, {constraints: false});
  Object.assign(exports, {Scene, Operate, Operates});
}

const cfg = {
  scene: {
    id: { type: Sequelize.BIGINT, primaryKey: true},
    orgId: Sequelize.BIGINT,
    userId: Sequelize.BIGINT,
    name: Sequelize.STRING,
  },
  scene_config: {
    updatedAt:  false,
    createdAt: 'createtime',
    tableName: 'sys_scene',
  },
  operate: {
    id: { type: Sequelize.BIGINT, primaryKey: true},
    menuId: Sequelize.BIGINT,
    menuName: Sequelize.STRING,
    operationName: Sequelize.STRING,
    url: Sequelize.STRING,
    parameter: Sequelize.STRING,
    result: Sequelize.STRING,
    description: Sequelize.STRING,
  },
  operate_config: {
    updatedAt: false,
    createdAt: false,
    tableName: 'sys_scene_operate',
  },
}
