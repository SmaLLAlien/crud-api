export const bodyParser = (req, res, cb) => {
    let data = '';

    req.on('data', function( chunk ) {
        data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        if (data && data.indexOf('{') > -1 ) {
            req.body = JSON.parse(data);
            cb(req, res);
        } else {
            cb(req, res);
        }
    });
}
