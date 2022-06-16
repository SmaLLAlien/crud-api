import {IRequest} from "../config/interfaces";
import * as http from "http";
import {USER_ERRORS} from "./errors";

export const handleDbError = (error: any, req: IRequest, res: http.ServerResponse) => {
    let msg: string;
    res.statusCode = 400;
    if (typeof error === 'string') {
        console.log(`[ERROR]: ${error}`);
        if (error === USER_ERRORS.idNotValid) {
            res.statusCode = 400;
        } else if (error === USER_ERRORS.noUser) {
            res.statusCode = 404;
        } else if (error === USER_ERRORS.allUserFieldsAreRequired || error === USER_ERRORS.ageNotANumber) {
            res.statusCode = 400;
        }
        msg = error;
    } else {
        res.statusCode = 500;
        console.log(`[ERROR]: ${error.message}`);
        msg = 'There is an error during request, please try again later';
    }

    res.end(JSON.stringify({error: msg}));
}
