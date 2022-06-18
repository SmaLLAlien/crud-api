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

export const updateUser = async (id: string, newUserData: User): Promise<User> => {
    return new Promise((resolve, reject) => {
        if (!isIdValidUUID(id)) {
            reject(new Error(USER_ERRORS.idNotValid));
        }

        if (newUserData.age) {
            const isAgeInvalid = checkAge(newUserData);
            isAgeInvalid && reject(new Error(isAgeInvalid));
        }

        if (newUserData.hobbies) {
            const isHobbiesInvalid = checkHobbies(newUserData)
            isHobbiesInvalid && reject(new Error(isHobbiesInvalid));
        }

        if (user_database.has(id)) {
            const dbUser: User = user_database.get(id);
            const updatedUser: User = {
                id: dbUser.id,
                username: newUserData.username ? newUserData.username : dbUser.username,
                age: newUserData.age ? newUserData.age : dbUser.age,
                hobbies: newUserData.hobbies ? newUserData.hobbies : dbUser.hobbies,
            };
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

const checkAge = (user: User): string => {
    if (typeof user.age !== "number") {
        return USER_ERRORS.ageNotANumber;
    }

    return null;
}

const checkHobbies = (user: User): string => {
    if (!Array.isArray(user.hobbies)) {
        return USER_ERRORS.hobbiesNotArray;
    }

    return null;
}

const checkUserRequirements = (user: User): string => {
    if (!user?.username?.trim() || !user.age || !user.hobbies) {
        return USER_ERRORS.allUserFieldsAreRequired;
    }

    const isAgeAppropriate = checkAge(user);
    if (isAgeAppropriate) {
        return isAgeAppropriate;
    }

    const isHobbiesAppropriate = checkHobbies(user);
    if (isHobbiesAppropriate) {
        return isHobbiesAppropriate;
    }

    return null;
}
const isIdValidUUID = (id: string): boolean => {
    return uuidValidate(id);
}
