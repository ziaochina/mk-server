module.exports = (url, routes) => { 
    console.log(url);

    routes.push({
        method: 'GET',
        path: url,
        handler: (request, reply) => {
            var apis = routes.filter(r => r.method == 'POST');
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
