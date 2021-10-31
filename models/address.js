'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Address.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'address name cannot be empty/null',
          },
          notNull: {
            msg: 'address name cannot be empty/null',
          },
        },
      },
      receiver: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'receiver cannot be empty/null',
          },
          notNull: {
            msg: 'receiver cannot be empty/null',
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'address cannot be empty/null',
          },
          notNull: {
            msg: 'address cannot be empty/null',
          },
        },
      },
      city_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'city_id cannot be empty/null',
          },
          notNull: {
            msg: 'city_id cannot be empty/null',
          },
        },
      },
      province_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'province_id cannot be empty/null',
          },
          notNull: {
            msg: 'province_id cannot be empty/null',
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Address',
    }
  );
  return Address;
};
