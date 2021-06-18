const db = require("../models");
const { Op } = require("sequelize");
const { ApolloError } = require('apollo-server-errors');

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
    },
    async addProductToCart(root, args, context){
      const product = await db.Product.findByPk(args.id);
      if(product.qnt - args.qnt >= 0){
        product.qnt -= args.qnt;
        await product.save();
        return product;
      }else{
        throw new ApolloError("Product out of stock", "403");
      }
    },
    async removeProductFromCart(root, args, context){
      const product = await db.Product.findByPk(args.id);
      product.qnt += args.qnt;
      await product.save();
      return product;
    }
  }
}