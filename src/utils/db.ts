import {USER_ERRORS} from "./errors";
import {User} from "./user";
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

const user_database = new Map();


export const getUser = async (id: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        if (!isIdValidUUID(id)) {
            reject(new Error(USER_ERRORS.idNotValid));
        }
        if (user_database.has(id)) {
            const user: User = user_database.get(id);
            resolve(user);
        } else {
            reject(new Error(USER_ERRORS.noUser));
        }
    });
}

export const getUsersList = async (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        const users = user_database.values();
        resolve([...users]);
    });
}

export const deleteUser = async (id: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!isIdValidUUID(id)) {
            reject(new Error(USER_ERRORS.idNotValid));
        }
        if (user_database.has(id)) {
            const user: User = user_database.get(id);
            user_database.delete(id);
            resolve(user.id);
        } else {
            reject(new Error(USER_ERRORS.noUser));
        }
    });
}

export const updateUser = async (id: string, newUserData: User): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!isIdValidUUID(id)) {
            reject(new Error(USER_ERRORS.idNotValid));
        }
        if (user_database.has(id)) {
            const dbUser = user_database.get(id);
            const updatedUser = {...dbUser, ...newUserData, id};
            user_database.set(id, updatedUser);
            resolve(updatedUser);
        } else {
            reject(new Error(USER_ERRORS.noUser));
        }
    });
}

export const createUser = async (user: User): Promise<User> => {
    return new Promise((resolve, reject) => {
        if (user.id && user_database.has(user.id)) {
            reject(new Error(USER_ERRORS.alreadyExist));
        } else {
            const isUserAppropriate = checkUserRequirements(user);
            if (isUserAppropriate) {
                reject(new Error(isUserAppropriate));
            }
            const newId = uuidv4();
            const newUser = new User(newId, user.username, user.age, user.hobbies);
            user_database.set(newId, newUser);
            resolve(newUser);
        }
    });
}

const checkUserRequirements = (user: User): string => {
    if (!user?.username?.trim() || !user.age || !user.hobbies) {
        return USER_ERRORS.allUserFieldsAreRequired;
    }
    if (typeof user.age !== "number") {
        return USER_ERRORS.ageNotANumber;
    }

    if (!Array.isArray(user.hobbies)) {
        return USER_ERRORS.hobbiesNotArray;
    }

    return null;
}
const isIdValidUUID = (id: string): boolean => {
    return uuidValidate(id);
}
