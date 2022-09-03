/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tracks').del()
  await knex('tracks').insert([
    {
      id: 1,
      name: 'Queen Charlotte Track',
      category: 'Intermediate',
      regionId: 1,
    },
    {
      id: 2,
      name: 'Anakiwa - Pelorus Bridge - Maungatapu Road end',
      category: 'Easy',
      regionId: 1,
    },
    { id: 3, name: 'Pelorus River Track', category: 'Advanced', regionId: 1 },
    { id: 4, name: 'Richmond Alpine Track', category: 'Expert', regionId: 2 },
  ])
}
