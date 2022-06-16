import * as http from 'http';
import * as db from '../utils/db';
import {IRequest} from "../config/interfaces";
import {handleDbError} from "../utils/handleDbError";

export const updateUser = async (req: IRequest, res: http.ServerResponse) => {
    try {
        const userId = await db.updateUser(req.body);
        res.statusCode = 200;
        res.end(JSON.stringify({userId}));
    } catch (e) {
        handleDbError(e, req, res);
    }
}
