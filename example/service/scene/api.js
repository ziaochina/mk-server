const service = require('./service');


Object.assign(exports, service);

exports._init = () => {
	service._init()
}
