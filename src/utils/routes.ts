import {createUser} from "../controllers/createUser";
import {getUsersList} from "../controllers/getUsersList";
import {updateUser} from "../controllers/updatUser";
import {deleteUser} from "../controllers/deleteUser";
import {getUser} from "../controllers/getUser";
import {defaultRoute} from "../controllers/defaultRoute";

export const STATIC_ROUTES = {
    POST: {
        'api/users': createUser,
    },
    GET: {
        '': defaultRoute,
        'api/users': getUsersList,
    }
}

export const ROUTES_WITH_PARAMS = {
    PUT: {
        'api/users/(.*)': updateUser,
    },
    DELETE : {
        'api/users/(.*)': deleteUser,
    },
    GET: {
        'api/users/(.*)': getUser,
    }
}
