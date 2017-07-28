const _md5 = require('./blueimp-md5')
const options = require('./../config').current

function md5(str, key){
  if(key === "${key}")key = options.md5.key;
  key = key || ""
  return _md5(str + key);
}

module.exports = md5
