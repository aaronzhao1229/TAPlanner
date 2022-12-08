import request from 'superagent'

export function getGearsForUser(userId) {
  return request.get(`/gears/getgears/${userId}`).then((res) => {
    return res.body
  })
}

export function getGearCategoriesForUser(userId) {
  return request.get(`/gears/getGearCategories/${userId}`).then((res) => {
    return res.body
  })
}

export function addGearCategoryForUser(category) {
  return request
    .post('/gears/addCategoryForUser')
    .send(category)
    .then((res) => res.body)
}

export function addGearForUser(gear) {
  return request
    .post('/gears/addGearForUser')
    .send(gear)
    .then((res) => res.body)
}

export function deleteGearForUser(gearId, userId) {
  return request.delete(`/gears/deleteGear/${gearId}/${userId}`).then((res) => {
    return res.body
  })
}

export function deleteCategoryForUser(categoryId, userId) {
  return request
    .delete(`/gears/deleteCategory/${categoryId}/${userId}`)
    .then((res) => {
      return res.body
    })
}
