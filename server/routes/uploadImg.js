const express = require('express')
const path = require('path')
const multer = require('multer')
const db = require('../db/db')
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

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    console.log('No file upload')
  } else {
    console.log(req.file.filename)
    let imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
    db.uploadImage(imgsrc)
      .then((ids) => res.json(ids))
      .catch((err) => {
        console.error(err.message)
        res.status(500).send('Server error')
      })
  }
})
module.exports = router
