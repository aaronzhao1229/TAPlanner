/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('plan_tracks').insert([
    { planId: 1, trackId: 1 },
    { planId: 2, trackId: 1 },
  ])
}
