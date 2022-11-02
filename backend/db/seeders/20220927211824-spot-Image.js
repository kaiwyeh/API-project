'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-26574926/original/5649f394-6bc3-4414-99ba-0e8a82ee8111.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://www.telegraph.co.uk/content/dam/Travel/2018/August/airbnb-great-wall-china-bedroom.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://i.insider.com/5e627be8a9f40c0bf655c917?width=1000&format=jpeg&auto=webp',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/dbb96ff7-9145-4f3f-9a87-0c0994981d59.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://www.thebrokebackpacker.com/wp-content/uploads/2021/03/La-Cabane-in-Uluwatu.jpg',
        preview: true,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SpotImages');
  }
};
