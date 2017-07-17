const dao = require('./dao')

exports._init = () => {
  dao._init();
}

exports.ping = (dto) => {
  return dto || true;
}

exports.create = (dto) => {
  return dto;
}
