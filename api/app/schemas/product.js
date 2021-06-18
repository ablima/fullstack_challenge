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
    getProducts(id: Int = null, name: String = null, categoryId: Int = null): [Product]
  }
  extend type Mutation {
    createProduct(product: NewProduct): Product
    addProductToCart(id: Int): Product
    removeProductFromCart(id: Int): Product
  }
`;