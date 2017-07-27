const rp = require('request-promise');

exports.post = ({ url, data, headers }) => rp({
    method: 'POST',
    uri: url,
    headers: headers,
    body: data,
    json: true,
})  