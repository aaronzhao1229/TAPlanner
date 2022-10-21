const express = require('express')

const gearsDb = require('../db/db.gears')
const router = express.Router()

router.get('/getgears/:userId', (req, res) => {
  const userId = req.params.userId
  gearsDb
    .getGears(userId)
    .then((gears) => {
      res.json(gears)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

module.exports = router
