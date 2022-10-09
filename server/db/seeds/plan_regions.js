/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('plan_regions').del()
  await knex('plan_regions').insert([
    { planId: 1, regionId: 1 },
    { planId: 2, regionId: 1 },
  ])
}
