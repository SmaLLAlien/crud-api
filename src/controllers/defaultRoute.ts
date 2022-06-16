import {IRequest} from "../config/interfaces";
import http from "http";

export const defaultRoute = async (req: IRequest, res: http.ServerResponse) => {
    res.statusCode = 200;
    res.end('<h1>welcome to homepage</h1><hr>');
}
