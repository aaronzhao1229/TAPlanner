/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('plan_sections').insert([
    { planId: 1, sectionId: 1 },
    { planId: 2, sectionId: 2 },
  ])
}
