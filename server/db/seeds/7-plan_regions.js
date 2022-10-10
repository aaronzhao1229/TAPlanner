/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('plan_regions').insert([
    { planId: 1, regionId: 1 },
    { planId: 2, regionId: 1 },
  ])
}
