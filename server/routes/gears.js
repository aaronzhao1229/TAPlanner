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

router.get('/getGearCategories/:userId', (req, res) => {
  const userId = req.params.userId
  gearsDb
    .getCategory(userId)
    .then((categories) => {
      res.json(categories)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

router.post('/addCategoryForUser', (req, res) => {
  const category = req.body
  gearsDb
    .addCategory(category)
    .then((categories) => res.json(categories))
    .catch((err) => {
      console.error(err.message)
      res.status(500).send(err.message)
    })
})

router.post('/addGearForUser', (req, res) => {
  const gear = req.body
  gearsDb
    .addGear(gear)
    .then((gears) => res.json(gears))
    .catch((err) => {
      console.error(err.message)
      res.status(500).send(err.message)
    })
})

router.delete('/deleteGear/:gearId/:userId', (req, res) => {
  const userId = req.params.userId
  const gearId = req.params.gearId
  gearsDb
    .deleteGear(gearId, userId)
    .then((gears) => res.json(gears))
    .catch((err) => {
      console.error(err.message)
      res.status(500).send(err.message)
    })
})

router.delete('/deleteCategory/:categoryId/:userId', (req, res) => {
  const userId = req.params.userId
  const categoryId = req.params.categoryId
  gearsDb
    .deleteCategory(categoryId, userId)
    .then((categories) => res.json(categories))
    .catch((err) => {
      console.error(err.message)
      res.status(500).send(err.message)
    })
})

module.exports = router
