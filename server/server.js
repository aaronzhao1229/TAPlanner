const path = require('path')
const express = require('express')
const cors = require('cors')
// const bodyparser = require('body-parser')

const planner = require('./routes/planner')
const uploadImage = require('./routes/uploadImg')
const server = express()
const users = require('./routes/users')

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(cors('*'))

// body-parser middleware use
// server.use(bodyparser.json())
// server.use(
//   bodyparser.urlencoded({
//     extended: true,
//   })
// )

server.use('/planner', planner)
server.use('/users', users)
server.use('/uploadImage', uploadImage)

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
