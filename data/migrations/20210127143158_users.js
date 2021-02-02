const { schema } = require("../config-db");

exports.up = async function(knex) {

    await knex.schema.createTable('users',tb=>{
        tb.increments('id')
        tb.text('username').notNull().unique()
        tb.text('password').notNull()
        tb.text('phoneNumber').notNull()
    })
    await knex.schema.createTable('plants',tb=>{
      tb.increments('id')
      tb.text('nickname').notNull().unique()
      tb.text('species').notNull()
      tb.text('frequency_hr').notNull()
      tb.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNull()
    
  })
  
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('plants')
  await knex.schema.dropTableIfExists('users')
};
