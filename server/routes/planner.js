const express = require('express')

const db = require('../db/db')
const router = express.Router()

router.get('/regions', (req, res) => {
  db.getRegions()
    .then((regions) => {
      res.json(regions)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

router.get('/tracks/:regionId', (req, res) => {
  const regionId = req.params.regionId
  db.getTracksByRegionId(regionId)
    .then((tracks) => {
      res.json(tracks)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

router.get('/sections/:trackId', (req, res) => {
  const trackId = req.params.trackId
  db.getSectionsByTrackId(trackId)
    .then((sections) => {
      res.json(sections)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

router.get('/stops/:trackId', (req, res) => {
  const trackId = req.params.trackId
  db.getStopsByTrackId(trackId)
    .then((stops) => {
      res.json(stops)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

router.get('/getAllInfo/:regionId/:trackId/:sectionId/:stopId', (req, res) => {
  const regionId = req.params.regionId
  const trackId = req.params.trackId
  const sectionId = req.params.sectionId
  const stopId = req.params.stopId
  db.getAllInfo(regionId, trackId, sectionId, stopId)
    .then((info) => {
      res.json(info)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

module.exports = router
