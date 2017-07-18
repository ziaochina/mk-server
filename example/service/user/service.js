//service只有业务逻辑代码，没有操作数据库的实现代码，通过_init的依赖其它api。
const dao = require('./dao')
const config = require('./config')

let api = config.getCurrent();

exports._init = () =>{
  dao._init();
}

exports.ping = (dto, ctx) => {
  try {
    return api.orgService.ping(dto);
    return dto||true;
    // console.log(api.dubbo.app)
    return api.IAppService.queryById(1000)
      .then(data=>ctx.return(data))
  } catch (e) {
    console.log(e)
  } finally {

  }
  // ctx.token([2078997663385600,null,null,null]);
  // return api.web.orginit(dto, ctx);
}

exports.log = (arr, ctx) => {
  return dao.log(arr);
}

exports.login = (dto, ctx) => {
  var account = dto.account || dto.mobile || dto.email;
  var password = dto.password;
  if(!account){
    throw({code: "10000", message: "用户名不能为空！"})
  }else if(!password){
    throw({code: "10000", message: "密码不能为空！"})
  }else if(password.length != 32){
    //模拟客户端的密码。
    password = api.utils.md5(password, api.cfg.service.md5key);
  }
  var funName = "findByMobile"
  if(account.indexOf("@") != -1){
    funName = "findByEmail"
  }
  return dao[funName](account).then(user => {
    if(!user){
      throw({code: "10000", message: "用户不存在！"})
    }
    let pwd = api.utils.md5(password, api.cfg.service.md5key);
    if(pwd != user.password){
      ctx.error({code: "10000", message: "密码不正确!"})
    }else{
      ctx.token([user.id,null,null,null]).return(true);
    }
  })
}

exports.logout = (userDto, ctx) => {
    return ctx.token();
}
exports.create = (dto, ctx) => {
    api.orgService.create({name:dto.orgName});
    return ctx.token();
}

exports.countByAppId = (dto, ctx) => {
  dao.countByAppId().then(user => {
    ctx.return(user);
  })
}
