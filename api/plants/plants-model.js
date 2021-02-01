const db = require('../../data/config-db')

const find = ()=>{
    return db('plants')
}
const findBy = name=>{
    return db('plants').where(name).first()
}
const findById = id=>{
    return db('plants').where('id',id).first()
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