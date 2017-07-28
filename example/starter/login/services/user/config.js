
const config = (options) => {
    Object.assign(current, options);
    if (current.services.db) {
        current.db = current.services.db.api.currentDB
    }
}

const current = {
}
 
module.exports = Object.assign(config, {
    current,
})