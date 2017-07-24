const model = require('./model') 

exports.create = (dto) => { 
    return model.UserLog().create(dto)
}
exports.bulkCreate = (dtos) => { 
    return model.UserLog().bulkCreate(dtos)
}