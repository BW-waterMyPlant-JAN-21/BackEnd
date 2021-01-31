const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const usersRoute = require('./api/auth/usersRoute')
const plantsRoute = require('./api/plants/plants-route')

const server = express()
server.use(cors())
server.use(express.json())
server.use(cookieParser())


server.use('/api/auth',usersRoute)
server.use('/api/plants',plantsRoute)

module.exports = server