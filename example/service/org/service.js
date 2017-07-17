const dao = require('./dao')

exports._init = (inject) => {
  dao._init(inject);
}

exports.ping = (dto) => {
  return dto || true;
}

exports.create = (dto) => {
  return dto;
}
