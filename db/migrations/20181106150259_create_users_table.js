
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table =>{
    table.increments('id')
    table.string('first_name', 30).notNullable()
    table.string('last_name', 30).notNullable()
    table.string('email', 50).notNullable().unique()
    table.string('password', 25).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
