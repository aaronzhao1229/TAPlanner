const express = require('express')
const router = express.Router()
const request = require('superagent')

require('dotenv').config()

router.get('/', (req, res) => {
  const text = req.query.text
  return request
    .get('https://maps.googleapis.com/maps/api/place/textsearch/json')
    .query({
      query: text,
      radius: 10000,
      key: process.env.GOOGLE_APIKEY,
    })
    .then((response) => {
      res.json(response.body.results)
    })
    .catch(() => {
      res.status(500).send('Internal Server Error')
    })
})

module.exports = router
