import {IRequest} from "../config/interfaces";
import * as http from "http";
import {USER_ERRORS} from "./errors";

export const getUsrIdFromUrl = (req: IRequest, res: http.ServerResponse) => {
    const url = req.url?.trim().replace(/^\/*|\/*$/g, "");
    const id = url.split('/').filter(p => !!p)[2];
    if (!id) {
        throw new Error(USER_ERRORS.idNotValid)
    }
    return id;
}
