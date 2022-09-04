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
    {
      id: 5,
      name: 'Cowshed Bay Campsite (Torea Saddle)',
      resupply: 'No',
      trackId: 1,
    },
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
    {
      id: 11,
      name: 'Captain Creek Hut',
      resupply: 'No',
      trackId: 3,
    },
    {
      id: 12,
      name: 'Middy Hut',
      resupply: 'No',
      trackId: 3,
    },
    {
      id: 13,
      name: 'Rocks Hut',
      resupply: 'No',
      trackId: 3,
    },
    {
      id: 14,
      name: 'Browning Hut',
      resupply: 'No',
      trackId: 3,
    },
    {
      id: 15,
      name: 'Nelson',
      resupply: 'Yes',
      trackId: 3,
    },
    {
      id: 16,
      name: 'Hacket Hut',
      resupply: 'No',
      trackId: 4,
    },
    {
      id: 17,
      name: 'Starveall Hut',
      resupply: 'No',
      trackId: 4,
    },
    {
      id: 18,
      name: 'Slaty Hut',
      resupply: 'No',
      trackId: 4,
    },
    {
      id: 19,
      name: 'Old Man Hut',
      resupply: 'No',
      trackId: 4,
    },
    {
      id: 20,
      name: 'Rintoul Hut',
      resupply: 'No',
      trackId: 4,
    },
    {
      id: 21,
      name: 'Tarn Hut',
      resupply: 'No',
      trackId: 4,
    },
    {
      id: 22,
      name: 'Mid Wairoa Hut',
      resupply: 'No',
      trackId: 4,
    },
    {
      id: 23,
      name: 'Top Wairoa Hut',
      resupply: 'No',
      trackId: 4,
    },
    {
      id: 24,
      name: 'Hunters Hut Hut',
      resupply: 'No',
      trackId: 4,
    },
    {
      id: 25,
      name: 'Porters Creek Hut',
      resupply: 'No',
      trackId: 4,
    },
    {
      id: 26,
      name: 'Red Hills Hut',
      resupply: 'No',
      trackId: 4,
    },
    {
      id: 27,
      name: 'St Arnaud',
      resupply:
        'Food parcels could be post to the Alpine Lodge, or Tophouse Historic Inn and Mountain View Cottages',
      trackId: 4,
    },
  ])
}
