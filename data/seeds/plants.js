
exports.seed = async function(knex) {

  await knex('plants').insert([
    {nickname:'japanese',species:'knotweed',frequency_hr:5},
    {nickname:'sunflower',species:'flowring Plants',frequency_hr:10}
  ])
 

};
