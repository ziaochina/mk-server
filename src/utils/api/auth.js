const jwt = require('jsonwebtoken');
var authKey = "token/Key";
var tokenKey = [];
var excludeUrls = [];
var secret = new Buffer(authKey, 'base64');

exports.auth = {
  setAuthKey: (key)=>{
    authKey = key;
    secret = new Buffer(authKey, 'base64');
  },
  setTokenKey: (key)=>{
    tokenKey = key; 
  },
  setExcludeUrls: (urls)=>{
    excludeUrls = urls || []; 
    excludeUrls.forEach(i => excludeUrls[i] = true)
  },
  "none": {},
  "base": new JsonToken(5 * 24 * 60 * 60), //5 days, seconds
  "tmp": new JsonToken(3 * 60), //3 minus, seconds
}

function JsonToken(exp){
  this.expire = exp;
  this.getToken = function(sub){
    sub = JSON.stringify(sub);
    let exp = Math.floor(Date.now() / 1000) + this.expire;
    let token = jwt.sign({ sub: sub, exp: exp }, secret, { algorithm: 'HS512' });
    return token;
  };
  this.getJson = function (token){
    if(!token)return token;
    let json = jwt.verify(token, secret, { algorithms: ['HS512'] });
    let obj = JSON.parse(json.sub)
    tokenKey && tokenKey.length > 0 && tokenKey.forEach((k,i) => obj[k] = obj[i])
    return obj;
  };
  this.exclude = function(apiUrl){ 
    return apiUrl && excludeUrls[apiUrl] === true;
  }
  return this;
}
