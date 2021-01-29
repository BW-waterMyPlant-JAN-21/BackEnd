const express = require('express')
const usersRoute = require('./api/usersRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const server = express()
server.use(cors())
server.use(express.json())
server.use(cookieParser())


server.use(usersRoute)

module.exports = server