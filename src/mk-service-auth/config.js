
function config(options) {
    Object.assign(current, options)
    current.secret = new Buffer(options.key , 'base64');
    current.excludeUrls = {};
    current.exclude.forEach(i => current.excludeUrls[i] = true)
    return current;
}

var current = {
    key: 'token/key',
    tokenKeys: null,
    exclude: [], 
    secret: null,
    expire: 5 * 24 * 60 * 60 , //5 days, seconds
}

module.exports = Object.assign(config, {
    current,
})
