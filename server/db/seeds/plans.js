/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('plans').del()
  await knex('plans').insert([
    { id: 1, userId: 1, day: 'Day 1', additionalNotes: 'Easy' },
    { id: 2, userId: 1, day: 'Day 2', additionalNotes: 'Easy' },
  ])
}
