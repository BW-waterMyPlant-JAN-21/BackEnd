const express = require('express')
const Users = require('./users-model')
const bcrypt = require('bcryptjs')
const router = express.Router()
router.use(express.json()) 

// get all users
router.get('/users', async (req,res,next)=>{
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
router.post('/users/register', async (req,res,next)=>{

    try{
        const {username,password, phoneNumber} = req.body
        const user = await Users.findBy({username})
        if(user.username===username){
            return res.status(409).json({message: "username is already taken"})
        }

        if(!username || !password || !phoneNumber){
            return res.status(404).json({message:"username, password and phoneNumber are required"})
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

router.post('/users/login', async (req,res,next)=>{

    try{
        const {username,password} = req.body

        if(!username || !password){
            return res.status(404).json({message: "username, password are required"})
        }

        const user = await Users.findBy({username})
        console.log('user',user)
        if(!user.username){
            return res.status(401).json({message: "invalid credentials"})
        }

        const validPassword = await bcrypt.compare(password,user.password)

        if(!validPassword){
            return res.status(401).json({message: "invalid credentials"})
        }

        res.status(200).json({message: `welcome ${user.username}`})

    }
    catch(err){next(err)}

})




module.exports = router