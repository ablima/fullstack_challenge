module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {});
  Order.associate = function(models){
    Order.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    });
    Order.belongsToMany(models.Product, {
      through: models.OrderProduct,
      as: "products"
    });
  }
    
  return Order;
}