
exports.seed = async function(knex) {

  await knex('users').insert([
    {username:'simo',password:'abc123456',phoneNumber: "201-568-9898"}
  ])
 
  
};
