var options = {};
var post = null;
var serverUrl = "";

module.exports = {
    name: "org",
	version: "",
    description: "",
    author: "lsg",
    config:(opt) => {
        Object.assign(options, opt);
        serverUrl = options.serverUrl;
        post = options.services.utils.fetch.post;
    },
    api:{
        findAll:(dto) => post(serverUrl + "/v1/user/ping", dto),   
    },
    dependencies:['utils'],
}