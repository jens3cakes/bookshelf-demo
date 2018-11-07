
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', table=>{
    table.increments('id');
    table.string('title', 60).notNullable();
    table.integer('author_id').references('id').inTable('users').notNullable();
    table.text('body');
    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
