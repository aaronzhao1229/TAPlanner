const path = require('path')
const express = require('express')
const cors = require('cors')
// const bodyparser = require('body-parser')

const planner = require('./routes/planner')

const server = express()
const users = require('./routes/users')
const location = require('./routes/location')

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, './public')))
server.use(cors('*'))

server.use('/planner', planner)
server.use('/users', users)
server.use('/location', location)

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
