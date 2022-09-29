'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'Lition',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'user1@user.io',
      },
      {
        firstName: 'Fake',
        lastName: 'Usertwo',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2'),
        email: 'user2@user.io',
      },
      {
        firstName: 'Fake',
        lastName: 'Userthree',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3'),
        email: 'user3@user.io',
      },
      {
        firstName: 'Fake',
        lastName: 'Userfour',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4'),
        email: 'user4@user.io',
      },
      {
        firstName: 'Fake',
        lastName: 'Userfive',
        username: 'FakeUser5',
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
