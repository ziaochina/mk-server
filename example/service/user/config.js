let _myOptions = {}

function config(options, reference){
  Object.assign(_myOptions, reference);
}

function getCurrent(){
  return _myOptions;
}

config.getCurrent = getCurrent;

module.exports = config;
