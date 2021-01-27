const knex = require('knex')
const environment = process.env.ENVIRONMENT || 'development'
const knexfile = require('../knexfile')
module.exports = knex(knexfile[environment]);