const _md5 = require('./blueimp-md5')

function md5(str, key){
  if(key === "${key}")key = md5.key;
  key = key || ""
  return _md5(str + key);
}

exports.md5 = md5
