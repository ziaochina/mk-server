const jwt = require('jsonwebtoken');
const options = require('./config').current;

const interceptor = (ctx) => {
    //向上下文中增加setToken方法和token对象。
    ctx.setToken = (obj) => {
        ctx.resBody.token = encodeToken(obj);
        return ctx;
    };
    ctx.token = {};

    var clientToken = ctx.request.headers.token || ctx.request.url.query.token;

    try {
        ctx.token = decodeToken(clientToken);
    } catch (error) {
        var { excludeUrls } = options;
        if (excludeUrls["*"] || excludeUrls[ctx.apiUrl]) return true;

        ctx.error({
            code: '402',
            message: '未登录'
        });
        return false;
    }
    return true;
}

function encodeToken(obj) {
    let { secret, expire } = options;
    let arr = [];

    if (!Array.isArray(obj) && Array.isArray(tokenKeys)) {
        tokenKeys.forEach((k, i) => arr[i] = obj[k])
    } else {
        arr = obj;
    }
    let sub = JSON.stringify(arr);
    let exp = Math.floor(Date.now() / 1000) + expire;
    let str = jwt.sign({ sub, exp }, secret, { algorithm: 'HS512' });
    return str;
}
function decodeToken(str) {
    if (!str) throw ({ code: 10, message: "empty token" });
    let { secret, tokenKeys } = options;

    let json = jwt.verify(str, secret, { algorithms: ['HS512'] });
    let obj = JSON.parse(json.sub)
    Array.isArray(obj) && Array.isArray(tokenKeys) && tokenKeys.forEach((k, i) => obj[k] = obj[i])
    return obj;
}

module.exports = {
    interceptor,
}