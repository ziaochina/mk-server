
const config = (options) => {
    Object.assign(current, options); 
}

const current = {
    db:() => current.services.db.api.getDB(),
}
 
module.exports = Object.assign(config, {
    current,
})