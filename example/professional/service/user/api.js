const service = require('./service')

const api = {};

api.login = ({username, password}, ctx) => {
    return service().login(username, password).then(user => {
        if(user){ 
            ctx.token([user.id, null, null, null])
            ctx.return(true)
        }else{
            ctx.return(false)
        }
    })
}
 
api.ping = (dto) => dto 
 
api.create = (dto, ctx) => service().create(dto).then(r => ctx.return(r)) 

api.save = (dto, ctx) =>{
    dto.id = ctx.token().userId;
    return service().save(dto);
}


api.login.auth = false
api.create.auth = false
api.ping.auth = false

module.exports = api;