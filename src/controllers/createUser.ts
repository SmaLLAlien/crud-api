import * as http from 'http';
import * as db from '../utils/db';
import {IRequest} from "../config/interfaces";
import {handleDbError} from "../utils/handleDbError";

export const createUser = async (req: IRequest, res: http.ServerResponse) => {
    try {
        const user = await db.createUser(req['body']);
        res.end(JSON.stringify(user));
    } catch (e) {
        handleDbError(e, req, res);
    }
}
