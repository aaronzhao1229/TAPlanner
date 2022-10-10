/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('plans').insert([
    { id: 1, userId: 1, day: 'Day 1', additionalNotes: 'Easy' },
    { id: 2, userId: 1, day: 'Day 2', additionalNotes: 'Easy' },
  ])
}
