/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('plan_tracks').del()
  await knex('plan_tracks').insert([
    { planId: 1, trackId: 1 },
    { planId: 2, trackId: 1 },
  ])
}
