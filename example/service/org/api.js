const service = require('./service');

exports._init = () => {
	service._init();
}
/**
 * 门户初始化
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
exports.ping = (data) => {
	return service.ping(" org ping called.")
}