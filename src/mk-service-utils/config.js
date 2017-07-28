
function config(options) {
    Object.assign(current, options)
}

var current = {
    md5: {
        key: ''
    }
}

module.exports = Object.assign(config, {
    current,
})
