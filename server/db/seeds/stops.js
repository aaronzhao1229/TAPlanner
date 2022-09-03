/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('stops').del()
  await knex('stops').insert([
    { id: 1, name: 'Camp Bay campsite', resupply: 'No', trackId: 1 },
    { id: 2, name: 'Blacrock Campsite', resupply: 'No', trackId: 1 },
    {
      id: 3,
      name: 'Mistletoe Bay Eco Village & Camping Ground',
      resupply: 'No',
      trackId: 1,
    },
    { id: 4, name: 'Anakiwa', resupply: 'No', trackId: 1 },
  ])
}
