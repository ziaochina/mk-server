const md5 = require('./blueimp-md5')
exports.md5 = (str, key) =>{
  key = key || ""
  return md5(str + key);
}
