const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    async getUsers(root, args, context){
      return db.User.findAll({
        where: {
          name: {
            [Op.startsWith]: args.name
          }
        }
      });
    }
  }  
}