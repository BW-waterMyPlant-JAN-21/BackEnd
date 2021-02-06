const express = require('express')
const Plants = require('./plants-model')
const Users = require('../auth/users-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const {validatePlantData, restrict} = require('../../middleware/middleware')
router.use(express.json()) 

const validateUser = ()=>{
    return async (req,res,next)=>{
        try{
            const id = req.params.user_id
            const user = await Users.findById(id)
            if(!user){
                return res.status(404).json({message:`no user exist with id ${id}`})
            }
            next()

        }
        catch(err){next(err)}
    }
}

//  get all plants belong to a specific user
// router.get('/users/:user_id/plants', validateUser(), async (req,res,next)=>{
    router.get('/', async (req,res,next)=>{
    try{
        // const id = req.params.user_id
        const plants = await Plants.find()
        res.status(200).json(plants)
    }
    catch(err){next(err)}
    
})

//get plants by id to a specific user

router.get('/:id', restrict(), async (req,res,next)=>{

    try{
        const plant = await Plants.findById(req.params.id)
        if(!plant){
            return res.status(401).json({message:`no plant exists with id ${req.params.id}`})
        }
        res.status(200).json(plant)
    }
    catch(err){next(err)}

})

//add new plant with specific user  ??????????????
router.post('/:user_id',validatePlantData() ,async (req,res,next)=>{

    try{
    
        const {id} = req.params
        const newPlant = await Plants.create(id,req.body)
        res.status(200).json(newPlant)
    }
    catch(err){next(err)}

})

//edit plant with specific user ??????????????
router.put('/:id',  validatePlantData(), async (req,res,next)=>{

    try{
        const updatedPlant = await Plants.update(req.params.id,req.body)
        res.status(200).json(updatedPlant)
    }
    catch(err){next(err)}

})

// delete plant based on id

router.delete('/plants/:id', async (req,res,next)=>{
    try{
        await Plants.remove(req.params.id)
        res.send({message: `plant with id ${req.params.id} is delete successfully`})
    }
    catch(err){next(err)}
})

module.exports = router