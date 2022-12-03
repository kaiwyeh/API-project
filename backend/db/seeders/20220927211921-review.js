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
      },
      {
        spotId: 6,
        userId: 4,
        review: "Great location, pleasant and spacious with amazing views. Hard to find this combo in Laguna.",
        stars: 5
      },
      {
        spotId: 6,
        userId: 5,
        review: "Absolutely perfect location and home. Wish we could have stayed longer!",
        stars: 5
      },
      {
        spotId: 7,
        userId: 2,
        review: "Cannot beat the location! Fantastic h it, very clean, very comfortable. We cannnot wait to plan a second stay!",
        stars: 5
      },
      {
        spotId: 7,
        userId: 5,
        review: "What a great way to vacation in Newport Beach! Location was amazing for beach, restaurants, and activities. Would highly recommend.",
        stars: 5
      },
      {
        spotId: 8,
        userId: 2,
        review: "Great view and location. AC and mini fridge were very nice to have. I had no issues with the water/shower pressure in the bathroom. Really enjoyed it!",
        stars: 5
      },
      {
        spotId: 8,
        userId: 2,
        review: "Clean room, comfortable beds. Everything else as described. Small shower with drainage issues, building in need of repair, and bright outdoor lights that cannot be dimmed.",
        stars: 4
      },
      {
        spotId: 9,
        userId: 2,
        review: "If you are looking for a mediocre, subpar, and non memorable experience then you need to find somewhere else! THIS CABIN IS AWESOME IN EVERY WAY!",
        stars: 5
      },
      {
        spotId: 9,
        userId: 5,
        review: "This amazing cabin is the hosts' personal getaway and they have chosen to make it available to lucky Airbnb guests as well.",
        stars: 5
      },
      {
        spotId: 10,
        userId: 2,
        review: "Beautifully located hillside, the house was designed to optimize views of the ocean. In the morning from the living room we enjoyed watching pods of dolphins swim by.",
        stars: 5
      },
      {
        spotId: 10,
        userId: 5,
        review: "It was hard to believe that a place so special in the photos could live up to our expectations in reality. There was so much room to either spread out or congregate.",
        stars: 5
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
