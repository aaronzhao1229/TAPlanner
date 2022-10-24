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