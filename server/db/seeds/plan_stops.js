/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('plan_stops').del()
  await knex('plan_stops').insert([
    { planId: 1, stopId: 1 },
    { planId: 2, stopId: 2 },
  ])
}
