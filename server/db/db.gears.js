const config = require('./knexfile').development

const connection = require('knex')(config)

module.exports = {
  getGears,
  getCategory,
  addCategory,
}

function getGears(userId, db = connection) {
  return db('gear_category')
    .join('gear_items', 'gear_category.id', 'gear_items.categoryId')
    .select(
      'userId',
      'gear_category.id as categoryId',
      'gear_category.name as category',
      'gear_items.id as gearId',
      'gear_items.name as gear',
      'description',
      'price',
      'weight',
      'quantity'
    )
    .where('userId', userId)
}

function getCategory(userId, db = connection) {
  return db('gear_category')
    .select('userId', 'id', 'name as category')
    .where('userId', userId)
}

function addCategory(category, db = connection) {
  return db('gear_category')
    .insert({
      name: category.category,
      userId: category.userId,
    })
    .then(() => getCategory(category.userId))
}
