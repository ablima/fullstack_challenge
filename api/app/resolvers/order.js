const db = require("../models");
const sequelize = require("sequelize");

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
  }
}