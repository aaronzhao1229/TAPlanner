exports.seed = async (knex) => {
  await knex('plan_regions').del()
  await knex('plan_sections').del()
  await knex('plan_stops').del()
  await knex('plan_tracks').del()
  await knex('plans').del()
  await knex('regions').del()
  await knex('sections').del()
  await knex('stops').del()
  await knex('tracks').del()
  await knex('users').del()
}
