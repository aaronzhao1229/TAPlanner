import request from 'superagent'

export function getRegions() {
  return request.get('/planner/regions').then((res) => {
    return res.body
  })
}
