
exports.up = function(knex) {
  return knex.schema.createTable('menu', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.string('image');
      table.decimal('value').notNullable();

      table.string('restaurant_cnpj')
        .references('cnpj')
        .inTable('restaurants');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('menu');
};
