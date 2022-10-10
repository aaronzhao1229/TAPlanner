/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('plan_stops').insert([{ planId: 1, stopId: 1 }])
}
