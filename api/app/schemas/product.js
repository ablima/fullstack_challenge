const { gql } = require('apollo-server-express');

module.exports = gql`
  type Product {
    id: Int
    name: String
    description: String
    qnt: Float
    price: Float
    thumbnails: String
    category: Category
    createdAt: String
    updatedAt: String
  }
  input NewProduct {
    name: String
    description: String
    qnt: Float
    price: Float
    thumbnails: String
    categoryId: Int
  }
  extend type Query {
    getProducts(name: String = ""): [Product]
  }
  extend type Mutation {
    createProduct(product: NewProduct): Product
  }
`;