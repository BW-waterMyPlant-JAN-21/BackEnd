const express = require('express')

const server = express()
server.use(express.json())

const validateData = ()=>{
    return async (req,res,next)=>{
        const {username,password, phoneNumber} = req.body

        if(!username || !password || !phoneNumber){
            return res.status(404).json({message:"username, password and phoneNumber are required"})
        }
        next()
    }
}


module.exports= {validateData}