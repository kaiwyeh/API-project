'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: '/reviews/1',
      },
      {
        reviewId: 2,
        url: '/reviews/2',
      },
      {
        reviewId: 3,
        url: '/reviews/3',
      },
      {
        reviewId: 4,
        url: '/reviews/4',
      },
      {
        reviewId: 5,
        url: '/reviews/5',
      },
      {
        reviewId: 6,
        url: "/reviews/6"
      },
      {
        reviewId: 7,
        url: "/reviews/7"
      },
      {
        reviewId: 8,
        url: "/reviews/8"
      },
      {
        reviewId: 9,
        url: "/reviews/9"
      },
      {
        reviewId: 10,
        url: "/reviews/10"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ReviewImages');
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
