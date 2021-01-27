
exports.seed = async function(knex) {

  await knex('users').insert([
    {usersname:'simo',password:''}
  ])
 
  
};
