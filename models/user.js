'use strict';
const { Model } = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, { through: 'ShoppingCart' });
      User.hasMany(models.ShoppingCart, { foreignKey: 'UserId' });
    }
  }
  User.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'email cannot be empty/null',
          },
          notNull: {
            msg: 'email cannot be empty/null',
          },
          isEmail: {
            msg: 'email format is wrong',
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'password cannot be empty/null',
          },
          notNull: {
            msg: 'password cannot be empty/null',
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate((user) => {
    user.email = user.email.toLowerCase();
    user.password = hash(user.password);
    user.role = 'customer';
  });
  return User;
};
