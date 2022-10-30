/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('gear_items', (table) => {
    table.increments('id')
    table.string('name')
    table.string('description')
    table.integer('price')
    table.integer('weight')
    table.integer('quantity')
    table.integer('categoryId').references('gear_category.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('gear_items')
}
