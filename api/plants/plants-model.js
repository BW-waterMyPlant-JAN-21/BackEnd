const db = require('../../data/config-db')

const find = ()=>{
    return db('plants')
}

module.exports= {find}