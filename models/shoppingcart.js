'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShoppingCart.belongsTo(models.User, { foreignKey: 'UserId' });
      ShoppingCart.belongsTo(models.Product, { foreignKey: 'ProductId' });
    }
  }
  ShoppingCart.init(
    {
      amount: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ShoppingCart',
    }
  );
  return ShoppingCart;
};
