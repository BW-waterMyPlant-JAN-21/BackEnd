const express = require('express')
const jwt= require('jsonwebtoken')

const server = express()
server.use(express.json())

const validateUserData = ()=>{
    return async (req,res,next)=>{
        const {username,password, phoneNumber} = req.body

        if(!username || !password || !phoneNumber){
            return res.status(404).json({message:"username, password and phoneNumber are required"})
        }
        next()
    }
}

const validatePlantData = ()=>{
    return async (req,res,next)=>{
        const {nickname, species,frequency_hr} = req.body

        if(!nickname || !species || !frequency_hr){
            return res.status(404).json({message:"nickname, species and frequency_hr are required"})
        }
        next()
    }
}

const restrict = ()=>{
    return async (req,res,next)=>{
        console.log('req middleware',req.cookies.token)
        try{
            const token = req.cookies.token
            if(!token){
                return res.status(403).json({message:'token is required'})
            }
            jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    res.status(403).json({message:'invalid token'})
                }
            })
            // req.token.decoded
            next()

        }
        catch(err){next(err)}

    }
}


module.exports= {validateUserData,validatePlantData,restrict}