import request from 'superagent'

export function getLocations(location) {
  return request
    .get(`/location`)
    .query({ text: location })
    .then((res) => {
      return res.body
    })
}
