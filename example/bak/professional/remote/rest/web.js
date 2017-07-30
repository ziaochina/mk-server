let post = null;
exports.config = (postMethod) =>{
	post = postMethod;
}
//客户账套创建
exports.orginit = function orginit(){
	return post('/v1/web/myyj/init',{})
}
