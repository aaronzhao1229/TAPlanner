/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('plan_sections').del()
  await knex('plan_sections').insert([
    { planId: 1, sectionId: 1 },
    { planId: 2, sectionId: 2 },
  ])
}
