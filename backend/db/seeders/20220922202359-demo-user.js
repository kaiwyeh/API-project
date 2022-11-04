'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'demo',
        lastName: 'user',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'demo@appacademy.io',
      },
      {
        firstName: 'Bob',
        lastName: 'Tran',
        username: 'BobTran',
        hashedPassword: bcrypt.hashSync('password2'),
        email: 'user2@user.io',
      },
      {
        firstName: 'Andrew',
        lastName: 'Lee',
        username: 'AndrewLee',
        hashedPassword: bcrypt.hashSync('password3'),
        email: 'user3@user.io',
      },
      {
        firstName: 'Kevin',
        lastName: 'Xu',
        username: 'KevinXu',
        hashedPassword: bcrypt.hashSync('password4'),
        email: 'user4@user.io',
      },
      {
        firstName: 'Lisa',
        lastName: 'Kim',
        username: 'LisaKim',
        hashedPassword: bcrypt.hashSync('password5'),
        email: 'user5@user.io',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
