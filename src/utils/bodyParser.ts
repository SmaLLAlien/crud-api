export const bodyParser = (req, res, cb) => {
    let data = '';

    req.on('data', function( chunk ) {
        data += chunk;
    });

    req.on('end', function() {
        try {
            req.body = data;
            if (data && data.indexOf('{') > -1 ) {
                req.body = JSON.parse(data);
                cb(req, res);
            } else {
                cb(req, res);
            }
        } catch (e) {
            console.log(`Cant parse request body: ${e.message}`);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Cant parse request body, please check payload'}));
        }
    });
}
