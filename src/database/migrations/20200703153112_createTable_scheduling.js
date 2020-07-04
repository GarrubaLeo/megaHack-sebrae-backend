
exports.up = function(knex) {
  return knex.schema.createTable('schedules', table => {
    table.increments('code').primary();
    table.string('date').notNullable();
    table.string('hour').notNullable();
    table.integer('people_quantity').notNullable();

    table.integer('id_user').references('id').inTable('users')

    table.string('restaurant_cnpj').references('cnpj').inTable('restaurants')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('schedules');
};
