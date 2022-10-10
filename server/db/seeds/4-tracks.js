/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('tracks').insert([
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
    {
      id: 5,
      name: 'Waiau Pass Track',
      category: 'Advanced to Expert',
      regionId: 2,
    },
  ])
}
