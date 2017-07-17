let _options = {}

function config(options){
  this.dependencies.map(dep => {
    let serviceName = dep.split(' as ')[0];
    let alias = dep.split(' as ')[1] || serviceName;
    _options[alias] = options.services[serviceName];
  })
}

function getCurrent(){
  return _options;
}

config.getCurrent = getCurrent;

module.exports = config;
