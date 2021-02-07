const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.status(200).json({message:" Welcome to build week Jan 2021"})
})

module.exports = router