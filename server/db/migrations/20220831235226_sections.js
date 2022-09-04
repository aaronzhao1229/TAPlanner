/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('sections', (table) => {
    table.increments('id')
    table.string('name')
    table.string('time')
    table.string('length')
    table.string('notes')
    table.integer('trackId').references('tracks.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('sections')
}
