const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    async getProducts(root, args, context){
      let idFilter = {};
      let categoryFilter = {};
      let nameFilter = {};

      if(args.id){
        idFilter = {
          id: args.id
        }
      }

      if(args.categoryId){
        categoryFilter = {
          categoryId: args.categoryId
        }
      }

      if(args.name){
        nameFilter = {
          name: {
            [Op.startsWith]: args.name
          }
        }
      }

      return db.Product.findAll({
        include: [
          {
            model: db.Category,
            as: "category"
          }
        ],
        where: {
          ...nameFilter,
          ...idFilter,
          ...categoryFilter
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