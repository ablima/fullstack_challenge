const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    async getCategories(){
      return db.Category.findAll();
    }
  }  
}