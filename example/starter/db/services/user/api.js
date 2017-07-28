const options = require('./config').current

const ping = (data) => data;

const login = (data, ctx) => {
  return options.db.query("SELECT version() version", { type: options.db.QueryTypes.SELECT })
    .then(version => {
      throw({code:11,message:'test roll back'})
      ctx.setToken([100, 200, 10]);
      ctx.return(version);
    })
    // .catch(ex =>{
    //   ctx.error(ex); 
    //   throw(ex);//from roll back
    // })
}

const create = (user, ctx) => user;

module.exports = {
  ping,
  login,
  create,
}

