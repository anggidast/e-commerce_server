'use strict';
const products = require('./products.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    products.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
