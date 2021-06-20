module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {
    tableName: 'categories'
  });
  
  return Category;
}