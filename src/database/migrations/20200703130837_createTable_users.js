
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('email').notNullable();
      table.string('cpf').notNullable();
      table.string('name').notNullable();
      table.string('password').notNullable();
    });
};

exports.down = function(knex) {
  knex.schema.dropTable('users');
};
