const service = require('./service');

exports._init = (inject) => {
	inject(service)
}

/**
 * 检测
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
exports.ping = (data, context) => {
	return service.ping(data, context)
}
exports.ping.auth = false;

/**
 * 用户操作日志
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
exports.log = (arr) => {
	return service.log(arr)
}

/**
 * 登录
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
exports.login = (data, context) => {
	return service.login(data, context)
}
exports.login.auth = false;
/**
 * 注销
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
exports.logout = (data, ctx) => {
	return service.logout(data, ctx)
}

/**
 * 注销
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
exports.countByAppId = (data, context) => {
	return service.countByAppId(data, context)
}
