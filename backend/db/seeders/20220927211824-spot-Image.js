'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: '/spotImages/1',
        preview: true,
      },
      {
        spotId: 2,
        url: '/spotImages/2',
        preview: true,
      },
      {
        spotId: 3,
        url: '/spotImages/2',
        preview: true,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages');
  }
};
