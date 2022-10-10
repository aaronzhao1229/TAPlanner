/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('users').insert([
    {
      id: 1,
      auth0Id: 'google-oauth2|110592088244127871018',
      firstName: 'Aaron',
      lastName: 'Zhao',
      location: 'Christchurch',
      image: './images/aaron.JPG',
    },
  ])
}
