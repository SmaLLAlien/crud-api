import * as http from 'http';
import * as db from '../utils/db';
import {IRequest} from "../config/interfaces";

export const getUsers = async (req: IRequest, res: http.ServerResponse) => {
    try {
        const userList = await db.getUsersList();
        res.end(JSON.stringify(userList));
    } catch (e) {
        let msg: string;
        if (typeof e === 'string') {
            console.log(`[ERROR] (getUsers): ${e}`);
            msg = e;
        } else {
            console.log(`[ERROR] (getUsers): ${e.message}`);
            msg = e.message;
        }
        res.statusCode = 400;
        res.end(JSON.stringify({error: msg}));
    }
}
