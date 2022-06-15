import * as http from 'http';

export const getUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const users = await Promise.resolve([{name: 'Alien', age: 22}, {name: 'Alien2', age: 33}]);
    return users;
}
