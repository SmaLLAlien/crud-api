import {IRequest} from "../config/interfaces";
import * as http from "http";

export const handleDbError = (error: any, req: IRequest, res: http.ServerResponse) => {
    let msg: string;
    if (typeof error === 'string') {
        console.log(`[ERROR]: ${error}`);
        msg = error;
    } else {
        console.log(`[ERROR]: ${error.message}`);
        msg = error.message;
    }
    res.statusCode = 400;
    res.end(JSON.stringify({error: msg}));
}
