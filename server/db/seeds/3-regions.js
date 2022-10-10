/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('regions').insert([
    { id: 1, name: 'Marlborough' },
    { id: 2, name: 'Tasman' },
    { id: 3, name: 'Canterbury' },
    { id: 4, name: 'Otago' },
    { id: 5, name: 'Southland' },
  ])
}
