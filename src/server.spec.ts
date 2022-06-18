import * as http from 'http';
import dotenv from 'dotenv'
import {server as MyServer} from "./server";
import {User} from "./utils/user";

const config = dotenv.config();
const PORT = Number(config?.parsed?.PORT) || 5000;
let createdUserIdScenario1: string = null;
let createdUserIdScenario2: string = null;
const userToCreateScenario1: User = {
    username: 'Alien',
    age: 22,
    hobbies: [],
    id: null
}

describe('Server.ts', () => {
    afterAll(() => MyServer.close());


    /* ************************************ SCENARIO 1 ********************************************* */


    describe('SCENARIO 1', () => {
        it('should return empty array if no users', (done) => {
            const options = {
                method: "GET",
                port: PORT,
                hostname: 'localhost',
                path: "/api/users"
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(200);
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    expect(JSON.parse(data)).toEqual([]);
                    done();
                });
            });
            request.end();
        });

        it('should create new user', (done) => {
            const options = {
                method: "POST",
                port: PORT,
                hostname: 'localhost',
                path: "/api/users"
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(201);
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    const createdUser: User = JSON.parse(data);
                    createdUserIdScenario1 = createdUser.id;
                    expect(createdUser.username).toEqual(userToCreateScenario1.username);
                    expect(createdUser.age).toEqual(userToCreateScenario1.age);
                    expect(createdUser.hobbies).toEqual(userToCreateScenario1.hobbies);
                    done();
                });
            });
            request.write(JSON.stringify(userToCreateScenario1));
            request.end();
        });

        it('should return created earlier user', (done) => {
            const options = {
                method: "GET",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${createdUserIdScenario1}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(200);
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    expect(JSON.parse(data)).toEqual({...userToCreateScenario1, id: createdUserIdScenario1});
                    done();
                });
            });
            request.end();
        });

        it('should update user', (done) => {
            const options = {
                method: "PUT",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${createdUserIdScenario1}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(200);
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    const updateUser: User = JSON.parse(data);
                    expect(updateUser).toEqual({...userToCreateScenario1, id: createdUserIdScenario1});
                    done();
                });
            });
            request.write(JSON.stringify(userToCreateScenario1));
            request.end();
        });
        it('should delete user', (done) => {
            const options = {
                method: "DELETE",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${createdUserIdScenario1}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(204);
                res.setEncoding('utf8');
                done();
            });
            request.end();
        });
        it('should return error as user was deleted', (done) => {
            const options = {
                method: "GET",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${createdUserIdScenario1}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(404);
                res.setEncoding('utf8');
                done();
            });
            request.end();
        });
    })


    /* ************************************ SCENARIO 2 ********************************************* */


    describe('SCENARIO 2', () => {
        it('should create new user', (done) => {
            const options = {
                method: "POST",
                port: PORT,
                hostname: 'localhost',
                path: "/api/users"
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(201);
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    const createdUser: User = JSON.parse(data);
                    createdUserIdScenario1 = createdUser.id;
                    expect(createdUser.username).toEqual(userToCreateScenario1.username);
                    expect(createdUser.age).toEqual(userToCreateScenario1.age);
                    expect(createdUser.hobbies).toEqual(userToCreateScenario1.hobbies);
                    done();
                });
            });
            request.write(JSON.stringify(userToCreateScenario1));
            request.end();
        });
        it('should create one more user', (done) => {
            const options = {
                method: "POST",
                port: PORT,
                hostname: 'localhost',
                path: "/api/users"
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(201);
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    const createdUser: User = JSON.parse(data);
                    createdUserIdScenario2 = createdUser.id;
                    expect(createdUser.username).toEqual(userToCreateScenario1.username);
                    expect(createdUser.age).toEqual(userToCreateScenario1.age);
                    expect(createdUser.hobbies).toEqual(userToCreateScenario1.hobbies);
                    done();
                });
            });
            request.write(JSON.stringify(userToCreateScenario1));
            request.end();
        });
        it('should return array of two users', (done) => {
            const options = {
                method: "GET",
                port: PORT,
                hostname: 'localhost',
                path: "/api/users"
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(200);
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    expect(JSON.parse(data).length).toEqual(2);
                    done();
                });
            });
            request.end();
        });

        it('should return created earlier user', (done) => {
            const options = {
                method: "GET",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${createdUserIdScenario1}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(200);
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    expect(JSON.parse(data)).toEqual({...userToCreateScenario1, id: createdUserIdScenario1});
                    done();
                });
            });
            request.end();
        });

        it('should update one of all users', (done) => {
            const options = {
                method: "PUT",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${createdUserIdScenario1}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(200);
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    const updateUser: User = JSON.parse(data);
                    expect(updateUser).toEqual({...userToCreateScenario1, id: createdUserIdScenario1});
                    done();
                });
            });
            request.write(JSON.stringify(userToCreateScenario1));
            request.end();
        });
        it('should delete one of user', (done) => {
            const options = {
                method: "DELETE",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${createdUserIdScenario1}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(204);
                res.setEncoding('utf8');
                done();
            });
            request.end();
        });
        it('should return one user as one was deleted', (done) => {
            const options = {
                method: "GET",
                port: PORT,
                hostname: 'localhost',
                path: "/api/users"
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(200);
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    expect(JSON.parse(data).length).toEqual(1);
                    done();
                });
            });
            request.end();
        });
        it('should delete last user', (done) => {
            const options = {
                method: "DELETE",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${createdUserIdScenario2}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(204);
                res.setEncoding('utf8');
                done();
            });
            request.end();
        });
        it('should return empty array as all users were deleted', (done) => {
            const options = {
                method: "GET",
                port: PORT,
                hostname: 'localhost',
                path: "/api/users"
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(200);
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    expect(JSON.parse(data)).toEqual([]);
                    done();
                });
            });
            request.end();
        });
    });


    /* ************************************ SCENARIO 3 ********************************************* */


    describe('SCENARIO 3', () => {
        it('should create new user', (done) => {
            const options = {
                method: "POST",
                port: PORT,
                hostname: 'localhost',
                path: "/api/users"
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(201);
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    const createdUser: User = JSON.parse(data);
                    createdUserIdScenario1 = createdUser.id;
                    expect(createdUser.username).toEqual(userToCreateScenario1.username);
                    expect(createdUser.age).toEqual(userToCreateScenario1.age);
                    expect(createdUser.hobbies).toEqual(userToCreateScenario1.hobbies);
                    done();
                });
            });
            request.write(JSON.stringify(userToCreateScenario1));
            request.end();
        });
        it('should return error if user was nod founded', (done) => {
            const wrongId = createdUserIdScenario1.slice(0, createdUserIdScenario1.length - 1) + '1';
            const options = {
                method: "GET",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${wrongId}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(404);
                res.setEncoding('utf8');
                done();
            });
            request.end();
        });

        it('should return error if updated not existed user', (done) => {
            const wrongId = createdUserIdScenario1.slice(0, createdUserIdScenario1.length - 1) + '1';
            const options = {
                method: "PUT",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${wrongId}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(404);
                res.setEncoding('utf8');
                done();
            });
            request.write(JSON.stringify(userToCreateScenario1));
            request.end();
        });

        it('should return error if user id is invalid on update', (done) => {
            const wrongId = 1111;
            const options = {
                method: "PUT",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${wrongId}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(400);
                res.setEncoding('utf8');
                done();
            });
            request.write(JSON.stringify(userToCreateScenario1));
            request.end();
        });

        it('should return error if user id is invalid on delete', (done) => {
            const wrongId = 11111;
            const options = {
                method: "PUT",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${wrongId}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(400);
                res.setEncoding('utf8');
                done();
            });
            request.write(JSON.stringify(userToCreateScenario1));
            request.end();
        });

        it('should return error if user id is invalid on get user', (done) => {
            const wrongId = 1111;
            const options = {
                method: "PUT",
                port: PORT,
                hostname: 'localhost',
                path: `/api/users/${wrongId}`
            };
            const request = http.request({...options}, (res) => {
                expect(res.statusCode).toBe(400);
                res.setEncoding('utf8');
                done();
            });
            request.write(JSON.stringify(userToCreateScenario1));
            request.end();
        });
    });
});
