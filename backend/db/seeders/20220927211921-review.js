'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'Great stay, great hospitality, very clean, and unbeatable location!',
        stars: 4,
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Wonderful, clean place!',
        stars: 4,
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Great location! Close to everything! Highly recommend this getaway spot!',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Not bad.',
        stars: 4,
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Good experience!',
        stars: 4,
      },
      {
        spotId: 3,
        userId: 5,
        review: 'Highly recommended!',
        stars: 5,
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Great price!',
        stars: 5,
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Good experience!',
        stars: 5,
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Nice view!',
        stars: 4,
      },
      {
        spotId: 5,
        userId: 2,
        review: 'Like the location!',
        stars: 4,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews');
  }
};












// 'use strict';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down(queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
