const { ApolloServer } = require('apollo-server-express');
const typeDefs = require("./app/schemas");
const resolvers = require("./app/resolvers");

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: {
    settings: {
      'schema.polling.enable': false,
    },
  },
});  