'use strict';

import * as http from 'http';
import dotenv from 'dotenv'
import {IRequest} from "./config/interfaces";
import {bodyParser} from "./utils/bodyParser";
import {getUrlHandler} from "./utils/getUrlHandler";
import {handleProcessExit} from "./utils/handleProcessExit";


const config = dotenv.config();
const PORT = Number(config?.parsed?.PORT) || 5000;


export const server = http.createServer(async (req: IRequest, res) => {
    res.setHeader('Process-Id', process.pid);
    const handler = getUrlHandler(req, res);

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

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType, index) => {
    process.on(eventType, () => handleProcessExit(index + 1));
});
