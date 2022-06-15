import * as http from 'http';

export const updateUser = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const user = await Promise.resolve({name: 'Alien', age: 111});
    return user;
}
