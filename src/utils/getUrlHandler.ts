import {IRequest} from "../config/interfaces";
import http from "http";
import {ROUTES_WITH_PARAMS, STATIC_ROUTES} from "./routes";

export const getUrlHandler = (req: IRequest, res: http.ServerResponse) => {
    const url = req.url?.trim().replace(/^\/*|\/*$/g, "");
    const method: string = req.method;

    let handler: any = STATIC_ROUTES[method] && STATIC_ROUTES[method][url];
    if (!handler) {
        let paramRoutes = ROUTES_WITH_PARAMS[method];
        paramRoutes && Object.keys(paramRoutes).forEach(r => {
            const regExp = new RegExp(r);
            if (url?.match(regExp) && url.split('/').length === r.split('/').length) {
                handler = paramRoutes[r];
            }
        })
    }

    return handler;
}
