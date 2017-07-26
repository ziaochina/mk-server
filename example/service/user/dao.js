const model = require('./model') 
var _dao = null; 

function dao(){ 
     return _dao = _dao || Object.assign(model(), dao)  
}

dao.findByUserName = (username) => {
    let where = {mobile: username}
    if(username.indexOf('@') != -1){
        where = {email: username}
    }
    return model().findOne({ where })
}

module.exports = dao;