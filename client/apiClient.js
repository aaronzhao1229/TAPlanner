import request from 'superagent'

export function getRegions() {
  return request.get('/planner/regions').then((res) => {
    return res.body
  })
}

export function getTracksByRegionId(regionId) {
  return request.get(`/planner/tracks/${regionId}`).then((res) => {
    return res.body
  })
}
