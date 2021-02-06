const express = require('express')
const jwt= require('jsonwebtoken')

const server = express()
server.use(express.json())

const validateUserData = ()=>{
    return (req,res,next)=>{
        const {username,password, phoneNumber} = req.body

        if(!username || !password || !phoneNumber){
            return res.status(404).json({message:"username, password and phoneNumber are required"})
        }
        next()
    }
}

const validatePlantData = ()=>{
    return async (req,res,next)=>{
        const {nickname, species,frequency_d} = req.body

        if(!nickname || !species || !frequency_d){
            return res.status(404).json({message:"nickname, species and frequency_d are required"})
        }
        next()
    }
}


const restrict = ()=>{
    return async (req,res,next)=>{
       
        try{
            const token = req.cookies.token
            if(!token){
                return res.status(403).json({message:'token is required'})
            }
            jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    res.status(403).json({message:'invalid token'})
                }
                req.token = decoded
            })
          
            next()

        }
        catch(err){next(err)}

    }
}


module.exports= {validateUserData,validatePlantData,restrict}