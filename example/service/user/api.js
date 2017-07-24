const service = require('./service')

exports.login = ({username, password}, ctx) => {
    return service.login(username, password).then(user => {
        if(user){ 
            ctx.token([user.id, null, null, null])
            ctx.return(true)
        }else{
            ctx.return(false)
        }
    })
}
exports.login.auth = false

exports.ping = (dto) => dto 
exports.ping.auth = false