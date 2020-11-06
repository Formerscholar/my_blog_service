'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Article.belongsTo(models.Category, {
        foreignKey:'category_id'
      });
      models.Article.belongsTo(models.User, {
        foreignKey:'user_id'
      });
    }
  };
  Article.init({
    title: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    content: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};