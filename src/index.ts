'use strict';

import * as http from 'http';
import dotenv from 'dotenv'
const config = dotenv.config();

const hostname = '127.0.0.1';
const PORT = +config.parsed.PORT || 5000;


const ROUTING = {
    POST: {
        '/api/users': (req, res) => {return {name: 'Alien3', age: 44}},
    },
    PUT: {
        '/api/users/*': (req, res) => {return {name: 'Alien3', age: 44}},
    },
    DELETE : {
        '/api/users/*': (req, res) => {return {}},
    },
    GET: {
        '/': '<h1>welcome to homepage</h1><hr>',
        '/api/users': (req, res) => {return [{name: 'Alien', age: 22}, {name: 'Alien2', age: 33}]},
        '/api/users/*': (req, res) => {return {name: 'Alien', age: 22}},
    }
}

const types = {
    object: JSON.stringify,
    string: s => s,
    number: n => n + '',
    undefined: () => 'not found',
    function: (fn, req, res) => fn(req, res),
};

const server = http.createServer((req, res) => {
    let route = ROUTING[req.method][req.url];
    if (!route) {
        res.statusCode = 404;
        res.end('not found\n');
    } else {
        const type = typeof route;
        const renderer = types[type];
        const result = renderer(route, req, res);
        res.end(JSON.stringify(result));
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EACCES') {
        console.log(`No access to port: ${PORT}`);
    }
});
