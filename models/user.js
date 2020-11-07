'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasOne(models.Article)
      models.User.hasOne(models.comment);
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    avatar: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    token: DataTypes.STRING,
    outtime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};