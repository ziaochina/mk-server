const dao = require('./dao')
const cfg = require('./config').current
 

exports.login = (username, password) => {  
    var utils = cfg.services.utils
    if(!username){
        throw({code: "10000", message: "用户名不能为空！"})
    }
    else if(!password){
        throw({code: "10000", message: "密码不能为空！"})
    }
    else if(password.length != 32){ 
        //模拟客户端的密码。
        password = utils.api.md5(password, "${key}");
    } 
    return dao.findByUserName(username).then(user => {
        if(!user){
            throw({code: "10000", message: "用户不存在！"}) 
        }
        let pwd = utils.api.md5(password, "${key}");
        if(pwd != user.password){
            throw({code: "10000", message: "密码不正确!"})
            return null
        } else {
            return user 
        }
    })
}