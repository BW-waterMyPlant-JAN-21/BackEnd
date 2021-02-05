
exports.seed = async function(knex) {

  await knex('plants').insert([
    {nickname:'japanese',species:'knotweed',frequency_d:5,user_id:1},
    {nickname:'sunflower',species:'flowring Plants',frequency_d:10,user_id:1}
  ])
 

};
