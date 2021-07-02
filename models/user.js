'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'role cannot be empty/null',
          },
          notNull: {
            msg: 'role cannot be empty/null',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
