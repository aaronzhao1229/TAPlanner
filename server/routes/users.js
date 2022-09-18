const express = require('express')
const path = require('path')
const multer = require('multer')
const usersDb = require('../db/db.users')
const router = express.Router()

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
module.exports = router
