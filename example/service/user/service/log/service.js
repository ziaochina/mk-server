const dao = require('./dao')
const config = require('./config').current
 

exports.create = (dtos) => {  
    var deviceId = null;
    if(!dtos){
        throw({code: "1002", message: "无操作记录"})
    }
    dtos.forEach(d => {
        if(d && !d.deviceId){
            if(!deviceId) deviceId = 1111;//TODO config.util.IDGenerator.generateObjectID();
            d.deviceId = deviceId;
        }
    });
    return dao.bulkCreate(dtos).then(r => deviceId);
}