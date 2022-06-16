import * as http from 'http';
import * as db from '../utils/db';
import {IRequest} from "../config/interfaces";

export const getUser = async (req: IRequest, res: http.ServerResponse) => {
    try {
        const user = await db.getUser(req.body);
        res.end(JSON.stringify(user));
    } catch (e) {
        let msg: string;
        if (typeof e === 'string') {
            console.log(`[ERROR] (getUser): ${e}`);
            msg = e;
        } else {
            console.log(`[ERROR] (getUser): ${e.message}`);
            msg = e.message;
        }
        res.statusCode = 400;
        res.end(JSON.stringify({error: msg}));
    }
}
