import {createUser} from "../controllers/createUser";
import {getUsers} from "../controllers/getUsers";
import {updateUser} from "../controllers/updatUser";
import {deleteUser} from "../controllers/deleteUser";
import {getUser} from "../controllers/getUser";

export const STATIC_ROUTES = {
    POST: {
        '/api/users': createUser,
    },
    GET: {
        '': '<h1>welcome to homepage</h1><hr>',
        '/api/users': getUsers,
    }
}

export const ROUTES_WITH_PARAMS = {
    PUT: {
        '/api/users/(.*)': updateUser,
    },
    DELETE : {
        '/api/users/(.*)': deleteUser,
    },
    GET: {
        '/api/users/(.*)': getUser,
    }
}
