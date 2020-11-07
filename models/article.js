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
        foreignKey:'CategoryId'
      });
      models.Article.belongsTo(models.User, {
        foreignKey:'UserId'
      });
      models.Article.hasMany(models.comment)
    }
  };
  Article.init({
    title: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    content: DataTypes.TEXT,
    CategoryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};