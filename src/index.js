const config = require('./config')
const { start } = require('./api')
 
module.exports = {
    name: "mk-server",
    version: "",
    description: "",
    author: "lsg",
    config,
    start, 
}


//未处理的异常
process.on('uncaughtException', function (err) {
    console.error('An uncaught error occurred!' + err.message);
    console.error(err.stack);
});
