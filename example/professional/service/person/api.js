const service = require('./service')

exports.create = (dto, ctx) => {
    return service().create(dto).then(dto => {
        ctx.return(dto);
    })
} 
//dto : { offset: 5, limit: 5, where: { id: 10}}
exports.findAll = (dto, ctx) => {
    return service().queryAll(dto).then(dto => {
        ctx.return(dto);
    })
} 

exports.ping = (dto) => dto 
exports.ping.auth = false