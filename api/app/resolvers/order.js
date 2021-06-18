const db = require("../models");
const sequelize = require("sequelize");
const { ApolloError } = require('apollo-server-errors');

const VALID_CARDS = ["0000111122223333"];
const INVALID_CARDS = ["3333222211110000"];

module.exports = {
  Query: {
    async getOrders(root, args, context){
      let conditions = {};

      if(args.userId != 0){
        conditions = {
          userId: args.userId
        }
      }

      return db.Order.findAll({
        include: [
          {
            model: db.User,
            as: "user"
          },
          {
            model: db.Product,
            as: "products"
          }
        ],
        where: conditions
      });
    }
  },
  Mutation: {
    async createOrder(root, args, context){
      if(INVALID_CARDS.includes(args.order.cardNumber)){
        throw new ApolloError("Credit card not approved", "403");
      }

      if(VALID_CARDS.includes(args.order.cardNumber)){
        const newOrder = {
          userId: args.order.userId,
          products: []
        } 
        
        return db.Order.create(newOrder)
          .then(
            (order) => {
              args.order.products.map(product => {
                order.addProduct(product.id, {
                  through: {
                    qnt: product.qnt
                  }
                });
              });
            }
          );  
      }

      throw new ApolloError("Invalid credit card.", "403");
    }
  }
}