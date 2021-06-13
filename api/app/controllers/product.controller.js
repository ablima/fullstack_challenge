const db = require("../models");
const utils = require("../utils/utils");
const Product = db.Product;

exports.findAll = (req, res) => {
  const { page, size } = req.query;

  Product.findAndCountAll({
    ...utils.paginate(parseInt(page), parseInt(size))
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

exports.update = (req, res) => {
  
};