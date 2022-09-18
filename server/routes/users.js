const express = require('express')
const path = require('path')
const multer = require('multer')
const usersDb = require('../db/db.users')
const router = express.Router()
const checkJwt = require('../auth0')

//! Use of Multer
let storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.resolve('server/public/images')) // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

let upload = multer({
  storage: storage,
})

router.post('/createProfile', upload.single('profile'), (req, res) => {
  if (!req.file) {
    console.log('No file upload')
  } else {
    const newProfile = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      location: req.body.location,
      image: './images/' + req.file.filename,
    }
    usersDb
      .createProfile(newProfile)
      .then(() => res.redirect('/gears')) //to be update
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
module.exports = router
