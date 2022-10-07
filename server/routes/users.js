const express = require('express')

const usersDb = require('../db/db.users')
const router = express.Router()
const checkJwt = require('../auth0')
const upload = require('../multer')

router.post('/createProfile', upload.single('image'), (req, res) => {
  if (!req.file) {
    console.log('No file upload')
  } else {
    const newProfile = {
      auth0Id: req.body.auth0Id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      location: req.body.location,
      image: './images/' + req.file.filename,
    }
    usersDb
      .createProfile(newProfile)
      .then(() => res.json(newProfile))
      .catch((err) => {
        console.error(err.message)
        res.status(500).send('Server error')
      })
  }
})

router.get('/singleUser', checkJwt, (req, res) => {
  const auth0_id = req.auth?.sub
  if (!auth0_id) {
    res.send(null)
  } else {
    usersDb
      .getUserById(auth0_id)
      .then((user) => {
        res.json(user ? user : null)
      })
      .catch((err) => {
        console.error(err.message)
        res.status(500).send(err.message)
      })
  }
})

router.post('/plans/addPlansForUser', (req, res) => {
  const plan = req.body
  usersDb
    .planForUser(plan)
    .then(() => {
      res.json(plan)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send(err.message)
    })
})

module.exports = router
