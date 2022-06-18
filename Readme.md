1. TASK: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md
2. Clone repository: ```git clone https://github.com/SmaLLAlien/crud-api.git```
3. Go to repository directory: ```cd crud-api```
4. Run server:
   - dev: ```npm run start:dev```
   - prod: ```npm run start:prod``` 
   - multi: ```npm run start:multi```
5. Send request as described in task
6. to run tests, run: ```npm run test```

Attention:
1) For request with ```userId```, id is used from url. Id from object will be ignored.
2) Request for update user is like patch, not all fields are required to update.
3) Api allow to send any fields to db, but saved will be only ones, that described in task
4) PLEASE send only objects that could be parsed by JSON.parse
5) All 3 scenarios of tests are in one file
