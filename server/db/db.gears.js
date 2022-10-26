const config = require('./knexfile').development

const connection = require('knex')(config)

module.exports = {
  getGears,
  getCategory,
  addCategory,
  addGear,
  deleteGear,
  deleteCategory,
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
    .then(() => getCategory(category.userId, db))
}

function addGear(gear, db = connection) {
  return db('gear_items')
    .insert({
      name: gear.gear,
      description: gear.description,
      price: gear.price,
      weight: gear.weight,
      quantity: gear.quantity,
      categoryId: gear.categoryId,
    })
    .then(() => getGears(gear.userId, db))
}

function deleteGear(gearId, userId, db = connection) {
  return db('gear_items')
    .delete()
    .where('id', gearId)
    .then(() => getGears(userId, db))
}

function deleteCategory(categoryId, userId, db = connection) {
  return db('gear_items')
    .delete()
    .where('categoryId', categoryId)
    .then(() => {
      return db('gear_category').delete().where('id', categoryId)
    })
    .then(() => getCategory(userId, db))
}
