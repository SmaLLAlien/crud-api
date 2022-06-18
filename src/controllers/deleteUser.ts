import * as http from 'http';
import * as db from '../utils/db';
import {IRequest} from "../config/interfaces";
import {handleDbError} from "../utils/handleDbError";
import {getUsrIdFromUrl} from "../utils/getUsrIdFromUrl";

export const deleteUser = async (req: IRequest, res: http.ServerResponse) => {
    try {
        const id = getUsrIdFromUrl(req, res);
        const userId = await db.deleteUser(id);
        res.statusCode = 204;
        res.end(JSON.stringify({userId}));
    } catch (e) {
        handleDbError(e, req, res);
    }
}
