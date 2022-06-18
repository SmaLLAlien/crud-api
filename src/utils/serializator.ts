import http from "http";

export const types = {
    object: async (data) => JSON.stringify(data),
    string: async (s: string) => s,
    number: async (n: number) => n + '',
    undefined: async () => 'not found',
    function: async (fn: any, req: http.IncomingMessage, res: http.ServerResponse) => await fn(req, res),
};
