/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('plans', (table) => {
    table.increments('id')
    table.integer('userId').references('users.id')
    table.string('day')
    table.string('additionalNotes')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('plans')
}
