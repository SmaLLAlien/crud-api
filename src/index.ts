'use strict';

import * as http from 'http';
import dotenv from 'dotenv'
import {getUsers} from "./controllers/getUsers";
import {IRequest} from "./config/interfaces";
import {getUser} from "./controllers/getUser";
import {deleteUser} from "./controllers/deleteUser";
import {createUser} from "./controllers/createUser";
import {updateUser} from "./controllers/updatUser";


const config = dotenv.config();
const PORT = Number(config?.parsed?.PORT) || 5000;


const STATIC_ROUTES = {
    POST: {
        '/api/users': createUser,
    },
    GET: {
        '': '<h1>welcome to homepage</h1><hr>',
        '/api/users': getUsers,
    }
}

const ROUTES_WITH_PARAMS = {
    PUT: {
        '/api/users/*': updateUser,
    },
    DELETE : {
        '/api/users/*': deleteUser,
    },
    GET: {
        '/api/users/*': getUser,
    }
}

const types = {
    object: async (data) => JSON.stringify(data),
    string: async (s: string) => s,
    number: async (n: number) => n + '',
    undefined: async () => 'not found',
    function: async (fn: any, req: http.IncomingMessage, res: http.ServerResponse) => await fn(req, res),
};

const server = http.createServer(async (req: IRequest, res) => {
    const url = req.url?.trim().replace(/\/$/, "");
    const method: string = req.method;
    let routeDataReturn: any = STATIC_ROUTES[method] && STATIC_ROUTES[method][url];
    if (!routeDataReturn) {
        let paramRoutes = ROUTES_WITH_PARAMS[method];
        Object.keys(paramRoutes).forEach(r => {
            if (url?.match(r)) {
                routeDataReturn = paramRoutes[r];
            }
        })
    }
    if (!routeDataReturn) {
        res.statusCode = 404;
        res.end('not found\n');
    } else {
        const type = typeof routeDataReturn;
        const renderer = types[type];
        const result = await renderer(routeDataReturn, req, res);
        res.end(typeof result === 'string' ? result : JSON.stringify(result));
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EACCES') {
        console.log(`No access to port: ${PORT}`);
    }
});
