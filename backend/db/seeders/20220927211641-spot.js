'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '2430 Newport Blvd',
        city: 'Costa Mesa',
        state: 'California',
        country: 'USA',
        lat: 33.653785493254716,
        lng: - 117.90601033981734,
        name: 'The Nugget - A tiny house near the beach',
        description: 'The Nugget is ideal for romantic getaways or business travels. It is nestled in a calm backyard, in a safe residential area, among bamboos, aloes and agaves. Special attention was given to the comfy queen bed. The "business corner" features fast Wi-Fi and a laptop desk.',
        price: 170,
      },
      {
        ownerId: 1,
        address: '2627 Newport Blvd',
        city: 'Newport Beach',
        state: 'California',
        country: 'USA',
        lat: 33.612840767237834,
        lng: - 117.92898133263157,
        name: 'Beach House in the heart of Balboa Peninsula',
        description: 'Come experience quintessential Newport Beach in your private cozy beach house. Spend your sunny days enjoying the outdoor patio or take a quick walk to the best California beaches for a day by the ocean. Spend warm nights BBQing at the house or walk over to Lido Marina Village to enjoy the finest waterfront eateries in town. It would not be a trip to the beach without access to activities; beach cruisers, boogie boards, beach towels, games, and beach chairs are all available for your use.',
        price: 400,
      },
      {
        ownerId: 1,
        address: '234 Adams Ave',
        city: 'Huntington Beach',
        state: 'California',
        country: 'USA',
        lat: 33.672303566337014,
        lng: - 117.99550932513951,
        name: 'Huntington Beach Bungalow 2 miles From The Beach',
        description: 'Modern 1 story bungalow in Huntington Beach. Mahogany wood floors, marble and granite throughout. Recessed lighting and rich decor. Fantastic location with private corner lot and large backyard with JACUZZI & BBQ. Easy parking drive way 4 cars ,AC (entire bungalow)great for summer , bikes available,alarm , and security cameras system .Boat and jet skis available for additional cost. Enjoy the World famous Huntington Beach Ca and take a day trip to Laguna Beach and Newport Beach close by.',
        price: 799,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots');
  }
};
