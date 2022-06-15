import * as http from 'http';

export const deleteUser = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const user = await Promise.resolve({name: 'Alien', age: 22});
    return user;
}
