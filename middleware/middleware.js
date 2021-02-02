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
        const {nickname, species,frequency_hr} = req.body

        if(!nickname || !species || !frequency_hr){
            return res.status(404).json({message:"nickname, species and frequency_hr are required"})
        }
        next()
    }
}

//validateUSER

const validateUser = ()=>{
    return async (req,res,next)=>{
        try{
            const id = req.params.id

        }
        catch(err){next(err)}
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
            })
            // req.token.decoded
            next()

        }
        catch(err){next(err)}

    }
}


module.exports= {validateUserData,validatePlantData,restrict}