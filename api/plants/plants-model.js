const db = require('../../data/config-db')

// find plants based on plants.user_id = users.id
// const find = (user_id)=>{
//     return db('plants as p').innerJoin("users as u","u.id","p.user_id").where({user_id: user_id}).select("p.id","p.nickname","p.species","p.frequency_d")
// }

const find= ()=>{
    return db('plants')
}

const findBy = (user_id,plant)=>{
    find(user_id)
    return db('plants').where('id',plant.id).first()
}

const findById =(id)=>{
    // find(user_id)
    return db('plants').where({id}) //.first().select('id','nickname','species','frequency_d')
}

const create = (id,plant) =>{
    return db.insert(plant).into('plants as p').innerJoin('users as u','u.id','p.user_id').where({id},'u.id') //.then(ids=>{return findById(ids[0])})
}

const update = (id,updatedItem)=>{
    return db('plants').update(updatedItem).where("id",id)
}

const remove = (id)=>{
    return db('plants').where('id',id).del()
}

module.exports= {find,findById,findBy,create,remove,update}