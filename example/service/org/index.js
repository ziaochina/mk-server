const service = require('./service');

exports._init = (injector) => {
	injector(service);
}
/**
 * 门户初始化
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
exports.ping = (data) => {
	return service.ping(data)
}
