module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    qnt: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'orderproducts'
  });    
      
  return OrderProduct;
}