import * as http from 'http';
import * as db from '../utils/db';
import {IRequest} from "../config/interfaces";
import {handleDbError} from "../utils/handleDbError";

export const getUsers = async (req: IRequest, res: http.ServerResponse) => {
    try {
        const userList = await db.getUsersList();
        res.end(JSON.stringify(userList));
    } catch (e) {
        handleDbError(e, req, res);
    }
}
