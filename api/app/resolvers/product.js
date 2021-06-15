const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    async getProducts(root, args, context){
      return db.Product.findAll({
        include: [
          {
            model: db.Category,
            as: "category"
          }
        ],
        where: {
          name: {
            [Op.startsWith]: args.name
          }
        }
      });
    }
  },
  Mutation: {
    async createProduct(root, args, context){
      return db.Product.create(args.product);
    }
  }
}