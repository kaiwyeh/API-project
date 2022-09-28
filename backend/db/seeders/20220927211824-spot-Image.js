'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'urlone',
        preview: true,
      },
      {
        spotId: 2,
        url: 'urltwo',
        preview: true,
      },
      {
        spotId: 3,
        url: 'urthree',
        preview: true,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SpotImages');
  }
};
