# nodejs-api-fejlesztes

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/).
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default port (27017).

## Generate a .gitignore file
- [toptal](https://www.toptal.com/developers/gitignore)
- [api](https://www.toptal.com/developers/gitignore/api/visualstudiocode,node)

## Test api
### Create
```javascript
fetch('http://localhost:3000/person', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({first_name: 'Jack', last_name: 'London', email: 'jl@gmail.com'})
}).then( r => r.json() )
.then( d => console.log(d) );
```

## Docker
### Dockerfile
```dockerfile
FROM node:latest
WORKDIR '/app'
COPY package.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]
```

### default.json
```json
"host": "mongo:27017/myFirstDatabase?retryWrites=true&w=majority"
```

### .gitignore
```
data
```

### docker-compose.yml
```dockerfile
version: "3"
services: 
    app:
        build: 
            dockerfile: Dockerfile
            context: .
        volumes: 
            - /app/node_modules
            - .:/app
        ports: 
            - "3000:3000"
        links: 
            - mongo
    mongo:
        container_name: mongo
        image: mongo:latest
        volumes: 
            - ./data/db:/data/db
        ports: 
            - "27017:27017"
```

### package.json
```json
"scripts": {
    "start": "node src/index.js",
    "test": "jest",
    "docker:build": "docker build -t nodejs-api-fejlesztes:latest .",
    "docker-compose:up": "docker-compose up"
  },
```

### server.js
```nodejs
mongoose
    .connect(`mongodb://${host}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
```


### .env
```
Nagyon fontos az alábbi fájl megléte a gyökérben, különben nem lesz token, vagyis nem lesz auth, vagyis, betonfal.
.env                ---> a fájl neve a gyökérben

PORT=3000
LOG_LEVEL_FILE=info
LOG_LEVEL_CONSOLE=debug
ACCESS_TOKEN_SECRET=very_secret_string_that_should_not_be_shared
REFRESH_TOKEN_SECRET=another_secret_string_that_should_not_be_shared
TOKEN_EXPIRY=20m

```

### docker --watcher
```
Menete:
npm i chokidar
npm i concurrently -D                               // -D => az a devDependencies

gyökérben new file :> watcher.js

```


### biztonságos mongoose
```
 npm i mongoose-bcrypt
```