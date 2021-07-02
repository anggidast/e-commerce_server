'use strict';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'admin@mail.com',
          password: bcrypt.hashSync('1234', salt), // admin1
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'user1@mail.com',
          password: bcrypt.hashSync('password1', salt), // password1
          role: 'customer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
