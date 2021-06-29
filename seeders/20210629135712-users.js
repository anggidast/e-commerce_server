'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'admin@mail.com',
          password: '$2a$04$PVGKz1/gjWvVawKstMhhj.6UtcgTw.phkRExxPO9EXQ59lybmqSAa', // admin1
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'user1@gmail.com',
          password: '$2a$04$dQN1SiEfxX33wK6lpSQq9.Zeb5SCqw3x/NY0X5VBzJYwPlx7vL4xm', // password1
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
