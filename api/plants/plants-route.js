const express = require('express')
const Plants = require('./plants-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
// const {validateData} = require('./middleware')
router.use(express.json()) 

router.get('/', async (req,res,next)=>{

    const plants = await Plants.find()
    res.status(200).json(plants)
})

module.exports = router