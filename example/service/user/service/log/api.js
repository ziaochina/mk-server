const service = require('./service')

exports.create = (dto, ctx) => {
    if(dto.logs && dto.logs){
        dto.logs.forEach((i,j) => {
            if(i && i[0] =="{"){
                dto.logs[j] = JSON.parse(i);
            }
        });
    }
    return service.create(dto.logs).then(dto => {
        ctx.return(dto.deviceId)
    })
}
exports.create.auth = false
