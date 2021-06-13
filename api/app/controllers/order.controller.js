const db = require("../models");
const utils = require("../utils/utils");
const Order = db.Order;

exports.findAll = (req, res) => {
  const { page, size } = req.query;
  
  Order.findAndCountAll({
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

exports.create = (req, res) => {

};