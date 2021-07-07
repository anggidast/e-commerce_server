'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'name cannot be empty/null',
          },
          notNull: {
            msg: 'name cannot be empty/null',
          },
        },
      },
      image_url1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'image_url cannot be empty/null',
          },
          notNull: {
            msg: 'image_url cannot be empty/null',
          },
        },
      },
      image_url2: DataTypes.STRING,
      image_url3: DataTypes.STRING,
      image_url4: DataTypes.STRING,
      image_url5: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'price cannot be empty/null',
          },
          notNull: {
            msg: 'price cannot be empty/null',
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'stock cannot be empty/null',
          },
          notNull: {
            msg: 'stock cannot be empty/null',
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'category cannot be empty/null',
          },
          notNull: {
            msg: 'category cannot be empty/null',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
