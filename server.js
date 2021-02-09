const express = require('express')
const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const welcomeRouter = require('./api/welcome')
const usersRoute = require('./api/auth/usersRoute')
const plantsRoute = require('./api/plants/plants-route')
const {restrict} = require('./middleware/middleware')
const db = require('./data/config-db')

const server = express()
server.use(helmet())
server.use(cors(
    {
        origin: 'https://front-end-j-mo.vercel.app/',
        credentials: true
    }
))
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

server.use(cookieParser()) // automatically parse incoming cookies and make them available in req.cookies 

server.use(welcomeRouter)
server.use(usersRoute)
server.use(plantsRoute)

module.exports = server