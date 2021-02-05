const express = require('express')
const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)
const cookieParser = require('cookie-parser')
const cors = require('cors')
const usersRoute = require('./api/auth/usersRoute')
const plantsRoute = require('./api/plants/plants-route')
const {restrict} = require('./middleware/middleware')
const db = require('./data/config-db')

const server = express()
server.use(cors())
server.use(express.json())

server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET,
    store: new knexSessionStore({
        knex: db,
        createTable: true  
    })

}))

server.use(cookieParser()) // automatically parse incoming cookies and make thm available in req.cookies 

server.use('/auth', usersRoute)
server.use('/api/', restrict(), plantsRoute)

module.exports = server