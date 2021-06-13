module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    qnt: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    thumbnails: DataTypes.STRING
  });
  Product.associate = function(models){
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId"
    });
    Product.belongsToMany(models.Order, {
      through: "OrderProduct"
    });
  }
  
  return Product;
}