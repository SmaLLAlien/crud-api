import * as http from 'http';
import * as db from '../utils/db';
import {IRequest} from "../config/interfaces";
import {handleDbError} from "../utils/handleDbError";
import {User} from "../utils/user";

export const createUser = async (req: IRequest, res: http.ServerResponse) => {
    try {
        const user: User = await db.createUser(req['body']);
        res.statusCode = 201;
        res.end(JSON.stringify(user));
    } catch (e) {
        handleDbError(e, req, res);
    }
}
