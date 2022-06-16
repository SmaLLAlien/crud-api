import * as http from 'http';
import * as db from '../utils/db';
import {IRequest} from "../config/interfaces";

export const updateUser = async (req: IRequest, res: http.ServerResponse) => {
    try {
        const userId = await db.updateUser(req.body);
        res.end(JSON.stringify({userId}));
    } catch (e) {
        let msg: string;
        if (typeof e === 'string') {
            console.log(`[ERROR] (updateUser): ${e}`);
            msg = e;
        } else {
            console.log(`[ERROR] (updateUser): ${e.message}`);
            msg = e.message;
        }
        res.statusCode = 400;
        res.end(JSON.stringify({error: msg}));
    }
}
