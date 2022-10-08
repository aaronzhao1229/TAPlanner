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

export function getSectionsByTrackId(trackId) {
  return request.get(`/planner/sections/${trackId}`).then((res) => {
    return res.body
  })
}

export function getStopsByTrackId(trackId) {
  return request.get(`/planner/stops/${trackId}`).then((res) => {
    return res.body
  })
}

export function getAllInfo(regionId, trackId, sectionId, stopId) {
  return request
    .get(`/planner/getAllInfo/${regionId}/${trackId}/${sectionId}/${stopId}`)
    .then((res) => {
      return res.body
    })
}

export function getPlansForUser(userId) {
  return request
    .get(`/users/plans/getPlansForUser/${userId}`)
    .then((res) => res.body)
}

export function addPlanForUser(plan) {
  return request
    .post(`/users/plans/addPlansForUser`)
    .send(plan)
    .then((res) => {
      return res.body
    })
}
