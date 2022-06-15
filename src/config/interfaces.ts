import * as http from "http";

export interface IRequest extends http.IncomingMessage {
    method?: string,
    url?: string,
    body?: any
}
