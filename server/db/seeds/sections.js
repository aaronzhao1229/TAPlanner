/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('sections').del()
  await knex('sections').insert([
    {
      id: 1,
      name: 'Ship Cove to Endeavour Inlet',
      time: '5 hours',
      length: '15km',
      notes: '',
      trackId: 1,
    },
  ])
}
