const model = require('./model') 

exports.findByUserName = (username) => {
    let where = {mobile: username}
    if(username.indexOf('@') != -1){
        where = {email: username}
    }
    return model.User().findOne({ where })
}