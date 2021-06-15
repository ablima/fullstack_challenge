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
      const query = await db.Product.findAll({
        attributes: [
          [sequelize.fn('sum', sequelize.col('price')), 'totalPrice'],
        ],
        where: {
          id: {
            [sequelize.Op.in]: args.order.productsId
          }
        }
      });

      const newOrder = {
        totalPrice: query[0].dataValues.totalPrice,
        userId: args.order.userId
      }

      return db.Order.create(newOrder)
        .then(
          async (order) => {
            order.addProducts(args.order.productsId);
          }
        );
    }
  }
}