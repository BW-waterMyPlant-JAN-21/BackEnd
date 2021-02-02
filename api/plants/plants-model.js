const db = require('../../data/config-db')

// find plants based on plants.user_id = users.id
const find = (user_id)=>{
    return db('plants as p').innerJoin("users as u","u.id","p.user_id").where("p.user_id",user_id).select("p.id","p.nickname","p.species","p.frequency_hr")
}
const findBy = (user_id,plant)=>{
    return db('plants').where(plant).first()
}
const findById = id=>{
    return db('plants').where('id',id).first().select('id','nickname','species','frequency_hr')
}

const create = plant =>{

    return db('plants').insert(plant).then(ids=>findById(ids[0]))
}
const remove = id=>{
    return db('plants').where('id',id).del()
}

const update = updatedItem=>{
    return db('plants').update(updatedItem)
}

module.exports= {find,findById,findBy,create,remove,update}