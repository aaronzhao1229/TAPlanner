/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('stops').del()
  await knex('stops').insert([
    { id: 1, name: 'Schoolhouse Bay campsite', resupply: 'No', trackId: 1 },
    { id: 2, name: 'Camp Bay campsite', resupply: 'No', trackId: 1 },
    { id: 3, name: 'Bay of Many Coves Campsite', resupply: 'No', trackId: 1 },
    { id: 4, name: 'Blackrock Campsite', resupply: 'No', trackId: 1 },
    { id: 5, name: 'Cowshed Bay Campsite', resupply: 'No', trackId: 1 },
    {
      id: 6,
      name: 'Mistletoe Bay Eco Village & Camping Ground',
      resupply: 'No',
      trackId: 1,
    },
    {
      id: 7,
      name: 'Davies Bay campsite',
      resupply: 'No',
      trackId: 1,
    },
    {
      id: 8,
      name: 'Anakiwa',
      resupply: 'The Green Caravan Café @ Anakiwa 401',
      trackId: 1,
    },
    {
      id: 9,
      name: 'Havelock',
      resupply: 'Four Square Supermarket, Inlet Bakery and Café, Bow to Stern',
      trackId: 2,
    },
    {
      id: 10,
      name: 'Pelorus Bridge Campground',
      resupply: 'Bounce boxes can be sent here',
      trackId: 2,
    },
  ])
}
