const { gql } = require('apollo-server-express');

module.exports = gql`
  type Order {
    id: Int
    totalPrice: Float
    user: User
    products: [Product]
  }
  input NewOrder {
    userId: Int,
    productsId : [Int]
  }
  extend type Query {
    getOrders(userId: Int = 0): [Order]
  }
  extend type Mutation {
    createOrder(order: NewOrder): Order
  }
`;