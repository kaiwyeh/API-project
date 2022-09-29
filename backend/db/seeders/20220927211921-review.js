'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'Great stay, great hospitality, very clean, and unbeatable location!',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Wonderful, clean place!',
        stars: 5,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Great location! Close to everything! Highly recommend this getaway spot!',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Not bad.',
        stars: 3,
      },
      {
        spotId: 3,
        userId: 5,
        review: 'Good experience!',
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
