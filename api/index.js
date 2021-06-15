const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require("./app/schemas");
const resolvers = require("./app/resolvers");
const db = require('./app/models');
const app = express();

const PORT = 3000;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: {
    settings: {
      'schema.polling.enable': false,
    },
  },
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
db.sequelize.sync({force: true}).then(() => {
  db.Product.create({
    name: "Produto 1",
    description: "Desc 1",
    qnt: 10,
    price: 10.15
  });
  db.Product.create({
    name: "Produto 2",
    description: "Desc 2",
    qnt: 20,
    price: 20.15
  });
  db.Product.create({
    name: "Produto 3",
    description: "Desc 3",
    qnt: 30,
    price: 30.15
  });
  db.Product.create({
    name: "Produto 4",
    description: "Desc 4",
    qnt: 40,
    price: 40.15
  });
  db.Product.create({
    name: "Produto 5",
    description: "Desc 5",
    qnt: 50,
    price: 50.15
  });
  db.Product.create({
    name: "Produto 6",
    description: "Desc 6",
    qnt: 60,
    price: 60.15
  });
  db.Product.create({
    name: "Produto 7",
    description: "Desc 7",
    qnt: 70,
    price: 70.15
  });
  db.Product.create({
    name: "Produto 8",
    description: "Desc 8",
    qnt: 80,
    price: 80.15
  });
  db.Product.create({
    name: "Produto 9",
    description: "Desc 9",
    qnt: 90,
    price: 90.15
  });
  db.Product.create({
    name: "Produto 10",
    description: "Desc 10",
    qnt: 100,
    price: 100.15
  });
  db.Product.create({
    name: "Produto 11",
    description: "Desc 11",
    qnt: 110,
    price: 110.15
  });
});
*/