const db = require('../data/config-db')

const find = ()=>{
    return db('users')
}
const findById = id=>{
    return db('users').where('id',id).first()
}

const findBy = credentials=>{
    return db('users').where(credentials).select('username','password','id').first()
}

const create = credentials=>{
    return db('users').insert(credentials).then(ids=>findById(ids[0]))
}

const remove = (id)=>{
return db('users').del().where('id',id)
}


module.exports={find,findBy,create,remove,findById}