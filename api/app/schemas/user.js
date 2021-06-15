const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: Int
    name: String
    email: String
    password: String
    createdAt: String
    updatedAt: String
  }
  extend type Query {
    getUsers(name: String = ""): [User]
  }
`;