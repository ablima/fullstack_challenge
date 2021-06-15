module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    totalPrice: DataTypes.DOUBLE
  });
  Order.associate = function(models){
    Order.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    });
    Order.belongsToMany(models.Product, {
      through: "OrderProduct",
      as: "products"
    });
  }
    
  return Order;
}