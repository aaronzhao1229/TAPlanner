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

module.exports = router
