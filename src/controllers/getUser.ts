import * as http from 'http';
import * as db from '../utils/db';
import {IRequest} from "../config/interfaces";
import {handleDbError} from "../utils/handleDbError";
import {getUsrIdFromUrl} from "../utils/getUsrIdFromUrl";

export const getUser = async (req: IRequest, res: http.ServerResponse) => {
    try {
        const id = getUsrIdFromUrl(req, res);
        const user = await db.getUser(id);
        res.statusCode = 200;
        res.end(JSON.stringify(user));
    } catch (e) {
        handleDbError(e, req, res);
    }
}
