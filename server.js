const express = require('express')
const usersRoute = require('./api/usersRoute')

const server = express()
server.use(express.json())

server.use(usersRoute)


module.exports = server