                                                  ### HP-Asset Management Test

## Installation

```
Recommended app port and host is
BE:
 host: localhost
 port: 3001
FE:
 host: localhost
 port: 3000
```

### Backend
1. cd backend
2. run npm install
3. provide env variable in .env (use env-example file as reference)
4. create database with name provided in ENV
5. run npm run migrate (migration)
6. run the program with npm run start or npm run dev(nodemon)

```
note: 
- Api docs link available in terminal log
- make sure port is the same as FE request
- make sure allow FE Origin in CORS Related ENV
```

### Frontend
1. cd frontend
2. run npm install
3. Adjust api port in axios.js and cors in package.json proxy (if not the same as recommendation) 
4. run npm run start to run the program
```
note: 
- Default app will run in port 3000
- changing the port in package.json script meaning adjusting proxy in package.json
```
