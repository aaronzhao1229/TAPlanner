/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('gear_category').del()
  await knex('gear_category').insert([
    { id: 1, name: 'Big Three', userId: 1 },
    { id: 2, name: 'Kitchen', userId: 1 },
  ])
}
