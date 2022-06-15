import * as http from 'http';

export const createUser = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const user = await Promise.resolve({name: 'Alien', age: 55});
    return user;
}
