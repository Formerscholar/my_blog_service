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
      // models.comment.hasMany(models.Article, {
      //   foreignKey:'articleId'
      // });
      models.comment.belongsTo(models.Article, {
        foreignKey:'ArticleId'
      })
    }
  };
  comment.init({
    content: DataTypes.STRING,
    ArticleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};