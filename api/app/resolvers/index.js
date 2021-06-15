const productResolver = require("./product");
const userResolver = require("./user");
const categoryResolver = require("./category");
const orderResolver = require("./order");

module.exports = [productResolver, userResolver, categoryResolver, orderResolver];