'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.comment.belongsTo(models.Article, {
        foreignKey:'ArticleId'
      })
      models.comment.belongsTo(models.User, {
        foreignKey:'id'
      })
    }
  };
  comment.init({
    content: DataTypes.STRING,
    ArticleId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};