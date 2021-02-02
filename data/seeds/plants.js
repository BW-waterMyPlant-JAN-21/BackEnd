
exports.seed = async function(knex) {

  await knex('plants').insert([
    {nickname:'japanese',species:'knotweed',frequency_hr:5,user_id:1},
    {nickname:'sunflower',species:'flowring Plants',frequency_hr:10,user_id:1}
  ])
 

};
