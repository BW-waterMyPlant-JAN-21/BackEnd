const express = require('express')
const usersRoute = require('./api/usersRoute')
const cors = require('cors')

const server = express()
server.use(express.json())

server.use(cors)
server.use(usersRoute)


module.exports = server