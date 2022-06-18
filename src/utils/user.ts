export class User {
    constructor(
        public id: string = null,
        public username: string,
        public age: number,
        public hobbies: string[],
        ) {
    }
}
