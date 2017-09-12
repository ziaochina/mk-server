module.exports = (url, routes) => {
    console.log("wsdl path: " + url);

    routes.push({
        method: 'GET',
        path: url,
        handler: (request, reply) => {
            var apis = routes.filter(r => {
                if (Array.isArray(r.method)) {
                    if (r.method.filter(m => m == "POST").length > 0) return true
                }
                return r.method == 'POST' || r.method == "*";
            });
            var html = wsdlHtml(apis);
            reply(html);
        }
    });

    return routes;
}


function wsdlHtml(routes) {
    return routes
        .map(r => `<a href='${r.path}'>${r.path}</a>`)
        .join('<br>')
}
