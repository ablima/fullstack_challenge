const express = require('express');
const server = require('./server');
const app = express();

const PORT = process.env.PORT || 3010;

server.applyMiddleware({ app, path: '/graphql' });

app.use('/static', express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});