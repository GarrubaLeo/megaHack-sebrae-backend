
exports.up = function(knex) {
  return knex.schema.createTable('restaurants', table => {
      table.string('cnpj', [14]).primary().notNullable(),
      table.string('image').notNullable(),
      table.string('name').notNullable(),
      table.string('latitude').notNullable(),
      table.string('longitude').notNullable(),
      table.string('uf').notNullable(),
      table.string('city').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('restaurants');
};
