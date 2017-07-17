const web = require('./web')

module.exports = {
  web,
}

exports.config = (post) =>{
	web.config(post);
}
