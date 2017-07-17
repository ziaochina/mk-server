const service = require('./service');


Object.assign(exports, service);

exports._init = (inject) => {
	inject(service)
}

// exports.ping = service.ping
// exports.create = service.create;
// exports.createOperate = service.createOperate;
// exports.delete = service.delete;
// exports.findById = service.findById;
// exports.findByAll = service.findByAll;
