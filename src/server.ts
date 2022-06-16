'use strict';

import * as http from 'http';
import dotenv from 'dotenv'
import {IRequest} from "./config/interfaces";
import {ROUTES_WITH_PARAMS, STATIC_ROUTES} from "./utils/routes";
import {bodyParser} from "./utils/bodyParser";


const config = dotenv.config();
const PORT = Number(config?.parsed?.PORT) || 5000;


const server = http.createServer(async (req: IRequest, res) => {
    res.setHeader('Process-Id', process.pid);
    const url = req.url?.trim().replace(/\/$/, "");
    const method: string = req.method;
    let handler: any = STATIC_ROUTES[method] && STATIC_ROUTES[method][url];
    if (!handler) {
        let paramRoutes = ROUTES_WITH_PARAMS[method];
        Object.keys(paramRoutes).forEach(r => {
            if (url?.match(r)) {
                handler = paramRoutes[r];
            }
        })
    }
    if (!handler) {
        res.statusCode = 404;
        res.end('not found\n');
    } else {
        bodyParser(req, res, async (req, res) => {
            handler(req, res);
        })
    }
});

server.listen(PORT, () => {
    console.log(`Proccess ${process.pid}: Server running at http://localhost:${PORT}/`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EACCES') {
        console.log(`No access to port: ${PORT}`);
    }
});
