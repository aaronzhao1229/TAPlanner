/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('gear_items').del()
  await knex('gear_items').insert([
    {
      id: 1,
      name: 'tent',
      description: 'Nemo Hornet 2P',
      price: 600,
      weight: 1100,
      quantity: 1,
      categoryId: 1,
    },
    {
      id: 2,
      name: 'sleeping mat',
      description: 'Thermarest Neoair Xlite',
      price: 365,
      weight: 340,
      quantity: 1,
      categoryId: 1,
    },
    {
      id: 3,
      name: 'gas stove',
      description: 'Kathmandu Titanium Stove',
      price: 83,
      weight: 50,
      quantity: 1,
      categoryId: 2,
    },
  ])
}
