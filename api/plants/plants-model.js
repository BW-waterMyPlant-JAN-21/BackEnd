const db = require('../../data/config-db')

// find plants based on plants.user_id = users.id
const find = (user_id)=>{
    return db('plants as p').innerJoin("users as u","u.id","p.user_id").where("p.user_id",user_id).select("p.id","p.nickname","p.species","p.frequency_d")
}

const findBy = (user_id,plant)=>{
    find(user_id)
    return db('plants').where('id',plant.id).first()
}

const findById =(user_id,id)=>{
    find(user_id)
    return db('plants').where('id',id).first().select('id','nickname','species','frequency_d')
}

const create = (user_id,plant) =>{
    return db('plants').insert(plant).then(ids=>{return findById(user_id,ids[0])})
}

const update = (id,updatedItem)=>{
    return db('plants').update(updatedItem).where("id",id)
}

const remove = (id)=>{
    return db('plants').where('id',id).del()
}

module.exports= {find,findById,findBy,create,remove,update}