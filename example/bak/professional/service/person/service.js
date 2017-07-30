const dao = require('./dao')
const cfg = require('./config').current
 
function service(){
    return dao();   //默认model
}

// service.create = (dto) => {   
//     return dao().create(dto);
// }

// service.findAll = (dto) => {   
//     return dao().findAll(dto);
// }

module.exports = service;