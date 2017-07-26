const model = require('./model') 


function dao(){
    return model.Person(); //默认model
}

dao.create = (dto) => {

}

module.exports = dao;