
exports.seed = async function(knex) {

  await knex('users').insert([
    {username:'simo',password:'$2a$12$ztrLRjLHBNCB1PKN161kU.2SFKSXCeB3MIQ/rVxYckTtj/0lLAn2u',phoneNumber: "201-568-9898"}
  ])
 
  
};
