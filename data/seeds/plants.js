
exports.seed = async function(knex) {

  await knex('plants').insert([
    {nickname:'japanese',species:'knotweed',frequency:'5 hrs'},
    {nickname:'sunflower',species:'flowring Plants',frequency:'10 hrs'}
  ])
 

};
