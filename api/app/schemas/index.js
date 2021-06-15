const { gql } = require('apollo-server-express');
const categorySchema = require("./category");
const productSchema = require("./product");
const userSchema = require("./user");
const orderSchema = require("./order");

const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = [rootType, categorySchema, productSchema, userSchema, orderSchema];