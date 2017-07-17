//service只有业务逻辑代码，没有操作数据库的实现代码，通过_init的依赖其它api。
const dao = require('./dao')

exports._init = (inject) => {
  inject(dao);
}

exports.ping = (dto, ctx) => {
  return dto || true;
}

exports.create = (dto, ctx) => {
  dto = {
    id: 100000000,
    orgId: 0,
    userId: 0,
    name: 'test node',
    operates:[
      {
        id: 1000000000,
        url: '/11111111111',
        parameter: 'ppppp',
      },
      {
        id: 1000000001,
        url: '/11111111111',
        parameter: 'ppppp',
      }
    ]
  };
  let optDto = {
    id: 1000000002,
    url: '/11111111111',
    parameter: 'ppppp',
  }
  return dao.create(dto)
  .then(r => dao.createOperate(optDto))
  .then(r => ctx.return(r))
}

exports.createOperate = (dto, ctx) => dao.createOperate(dto).then(r => ctx.return(r));

exports.findById = ({id}, ctx) => dao.findById(id).then(d => ctx.return(d));

exports.findAll = (where, ctx) => dao.findAll({where}).then(d => ctx.return(d));
