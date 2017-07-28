const options = require('./config').current

const ping = (data) => data;

const login = (data, ctx) => {
  options.db.query("SELECT version() version", { type: options.db.QueryTypes.SELECT })
    .then(function (version) {
      ctx.setToken([100, 200, 10])
      ctx.return(version);
    });
}

const create = (user, ctx) => user;

module.exports = {
  ping,
  login,
  create,
}

