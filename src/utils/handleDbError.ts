import {IRequest} from "../config/interfaces";
import * as http from "http";
import {USER_ERRORS} from "./errors";

export const handleDbError = (error: any, req: IRequest, res: http.ServerResponse) => {
    let msg = 'There is an error during request, please try again later';
    res.statusCode = 500;
    if (typeof error === 'string') {
        console.log(`[ERROR]: ${error}`);
        if (error === USER_ERRORS.idNotValid) {
            res.statusCode = 400;
            msg = error;
        } else if (error === USER_ERRORS.noUser) {
            res.statusCode = 404;
            msg = error;
        } else if (error === USER_ERRORS.allUserFieldsAreRequired || error === USER_ERRORS.ageNotANumber || error === USER_ERRORS.hobbiesNotArray) {
            res.statusCode = 400;
            msg = error;
        }
    } else {
        if (error.message === USER_ERRORS.idNotValid) {
            res.statusCode = 400;
            msg = error.message;
        } else if (error.message === USER_ERRORS.noUser) {
            res.statusCode = 404;
            msg = error.message;
        } else if (error.message === USER_ERRORS.allUserFieldsAreRequired || error.message === USER_ERRORS.ageNotANumber || error.message === USER_ERRORS.hobbiesNotArray) {
            res.statusCode = 400;
            msg = error.message;
        }
        console.log(`[ERROR]: ${error.message}`);
    }

    res.end(JSON.stringify({error: msg}));
}
