'use strict';

import * as http from 'http';
import dotenv from 'dotenv'
import {IRequest} from "./config/interfaces";
import {ROUTES_WITH_PARAMS, STATIC_ROUTES} from "./utils/routes";
import {types} from "./utils/serializator";
import {bodyParser} from "./utils/bodyParser";


const config = dotenv.config();
const PORT = Number(config?.parsed?.PORT) || 5000;


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
        bodyParser(req, res, async (req, res) => {
            const type = typeof routeDataReturn;
            const renderer = types[type];
            const result = await renderer(routeDataReturn, req, res);
            res.end(typeof result === 'string' ? result : JSON.stringify(result));
        })
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
