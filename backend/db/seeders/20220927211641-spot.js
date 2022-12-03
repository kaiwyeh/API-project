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
        name: 'House near the beach',
        description: ' The House is ideal for romantic getaways or business travels. It is nestled in a calm backyard, in a safe residential area, among bamboos, aloes and agaves. Special attention was given to the comfy queen bed. The "business corner" features fast Wi-Fi and a laptop desk.',
        price: 370,
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
        description: ' Come experience quintessential Newport Beach in your private cozy beach house. Spend your sunny days enjoying the outdoor patio or take a quick walk to the best California beaches for a day by the ocean. Spend warm nights BBQing at the house or walk over to Lido Marina Village to enjoy the finest waterfront eateries in town.',
        price: 400,
      },
      {
        ownerId: 1,
        address: '2680 32nd St',
        city: 'Santa Monica',
        state: 'California',
        country: 'USA',
        lat: 34.0229584173266,
        lng: - 118.45300365953959,
        name: 'Beautiful house near Santa Monica Pier',
        description: ' Modern 2 story house in Santa Monica. Mahogany wood floors, marble and granite throughout. Recessed lighting and rich decor.',
        price: 799,
      },
      {
        ownerId: 2,
        address: '589 Main Street',
        city: 'Huntington Beach',
        state: 'California',
        country: 'USA',
        lat: 33.662864354701306,
        lng: - 117.99869045615614,
        name: 'Huntington Beach, Amazing View',
        description: ' You have to see the view from this place!',
        price: 435,
      },
      {
        ownerId: 2,
        address: '1601 E 16th Street',
        city: 'Newport Beach',
        state: 'California',
        country: 'USA',
        lat: 33.62523673609298,
        lng: - 117.91752602842305,
        name: '1 mile from Newport Beach',
        description: ' Fantastic location with private corner lot and large backyard with JACUZZI & BBQ. Easy parking drive way 4 cars ,AC (entire bungalow)great for summer , bikes available,alarm , and security cameras system .Boat and jet skis available for additional cost.',
        price: 435,
      },
      {
        ownerId: 3,
        address: "123 Main Street",
        city: "Laguna Beach",
        state: "California",
        country: "US",
        lat: 33.5,
        lng: 117.8,
        name: "Private Stairs from home to Beach!",
        description: "Enjoy a unique ocean front experience at our family town home.",
        price: 800
      },
      {
        ownerId: 3,
        address: "123 Ocean Ave",
        city: "Newport Beach",
        state: "California",
        country: "US",
        lat: 33.6,
        lng: 117.9,
        name: "Waterfront Home & Beach Access!",
        description: "Get away from it all and indulge in that long-awaited beach vacation!",
        price: 360
      },
      {
        ownerId: 3,
        address: "456 Main Street",
        city: "Laguna Beach",
        state: "California",
        country: "US",
        lat: 33.4,
        lng: 117.7,
        name: "Oceanfront For Ultimate Relaxation",
        description: "Situated on prime oceanfront property, you'll experience peace and ultimate relaxation.",
        price: 225,
      },
      {
        ownerId: 3,
        address: "987 Lake Street",
        city: "Lake Arrowhead",
        state: "California",
        country: "US",
        lat: 34.2,
        lng: 117.1,
        name: "A-Frame Cabin W Views",
        description: "When you walk into the space you will immediately notice the stunning views.",
        price: 400
      },
      {
        ownerId: 4,
        address: "888 Hillside",
        city: "Malibu",
        state: "California",
        country: "US",
        lat: 34.1,
        lng: 118.7,
        name: "Architectural w/ Ocean View",
        description: "Eagle's Watch is one of Malibu's most famous houses, impossible to miss while driving.",
        price: 1200
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots');
  }
};
