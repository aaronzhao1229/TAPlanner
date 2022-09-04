/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('regions').del()
  await knex('regions').insert([
    { id: 1, name: 'Marlborough' },
    { id: 2, name: 'Tasman' },
    { id: 3, name: 'Canterbury' },
    { id: 4, name: 'Otago' },
    { id: 5, name: 'Southland' },
  ])
}
