/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('image').insert([{ id: 1, url: './images/gears.png' }])
}
