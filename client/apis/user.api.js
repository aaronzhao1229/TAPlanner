import request from 'superagent'

export function getUser(token) {
  return request
    .get(`/users/singleUser`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}

export function uploadProfile(user) {
  return request
    .post('/users/createProfile')
    .send(user)
    .then((res) => res.body)
}
