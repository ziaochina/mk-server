function translate (cfg) {
  for (var key in cfg) {
    var value = cfg[key];
    if (!value || !cfg.hasOwnProperty(key))continue;
    if(typeof value == "object"){
      translate(value)
    }
    else if(typeof value == "string"){
      var match = value.match(/\${(\w+)}/);
      if(match && match[1]){
        var evnValue = process.env[match[1]];
        if(evnValue)cfg[key] = evnValue;
      }
    }
  }
  return cfg;
}

exports.env = translate;
