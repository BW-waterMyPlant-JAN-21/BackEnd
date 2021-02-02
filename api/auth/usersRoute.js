const express = require('express')
const Users = require('./users-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const {validateUserData,restrict} = require('../../middleware/middleware')
router.use(express.json()) 

// welcome page
router.get('/',(req,res,next)=>{
    res.status(200).json({message:" Welcome to build week Jan 2021"})
})

// get all users
router.get('/users', restrict(),async (req,res,next)=>{
    try{
        const users = await Users.find()
        res.status(200).json(users)

    }
    catch(err){next(err)}
})

// get user by id
router.get('/users/:id', async (req,res,next)=>{
    try{
        const user = await Users.findById(req.params.id)
        res.status(200).json(user)

    }
    catch(err){next(err)}
})

// register user
router.post('/register',validateUserData(), async (req,res,next)=>{

    try{
        const {username,password, phoneNumber} = req.body
        
        const user = await Users.findBy({username})
      
        if(user){
            return res.status(409).json({message: "username is already taken"})
        }

      
        const newUser = await Users.create({
            username,
            password: await bcrypt.hash(password,12),
            phoneNumber
        })

        res.status(201).json(newUser)

    }
    catch(err){next(err)}
})

// login user

router.post('/login', async (req,res,next)=>{

    try{
        const {username,password} = req.body

        if(!username || !password){
            return res.status(404).json({message: "username, password are required"})
        }

        const user = await Users.findBy({username})
        console.log('user',user)
        if(!user){
            return res.status(401).json({message: "invalid credentials"})
        }

        const validPassword = await bcrypt.compare(password,user.password)

        if(!validPassword){
            return res.status(401).json({message: "invalid credentials"})
        }

        const token  = jwt.sign({
            userId: user.id,
        }, process.env.JWT_SECRET )

        res.cookie('token',token) //tell the client to save this token in its cookie jar

         // if valid username and password, create new session and send it to client
         req.session.user = user

        res.status(200).json({token: token})
     
    }
    catch(err){next(err)}

})


//logout

router.get('/logout',async (req,res,next)=>{
    console.log('req.session',req.session)
    try{
        req.session.destroy(err=>{
            if(err){
                next(err)
            } else{
                res.send({message:'logout successfully'})
                res.status(204).end()
            }
        })
    }
    catch(err){next(err)}
    next()
})




module.exports = router