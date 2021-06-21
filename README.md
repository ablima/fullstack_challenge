# Fullstack Challenge

## Stack used

Database:
* Mysql

Backend:
* Node.js (Express)
* Apollo-server for GraphQL
* Sequelize as ORM
* Jest for testing

Frontend:
* React
* Apollo-client for GraphQL
* Using react-scripts for testing (Jest)

## Installation

### Using Docker Compose

1. Go to project _root folder_
2. execute: `docker-compose build`
3. execute: `docker-compose up`

### Without Docker

#### Backend
1. Create a table on mysql named _"mystore"_ (Mysql need to be installed)
2. Go to _api_ folder
3. execute: `npm install`
4. execute: `node index.js`

#### Frontend
1. Go to web folder
2. execute: `yarn install` (needs yarn installed)
3. execute: `yarn start`

## Testing

* For backend, the test is running when the docker container is up
* Alternatively, you can execute `npm run test` on _api_ folder

* For frontend, execute `yarn test` on _web_ folder
