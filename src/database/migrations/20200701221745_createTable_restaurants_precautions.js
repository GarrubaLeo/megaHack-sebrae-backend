
exports.up = function (knex) {
    return knex.schema.createTable('restaurants_precautions', table => {
        table.increments('id').primary();

        table.string('restaurant_cnpj').notNullable()
        table.integer('precaution_id').notNullable()

        table.foreign('restaurant_cnpj').references('cnpj').inTable('restaurants')
        table.foreign('precaution_id').references('id').inTable('precautions')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('restaurants_precautions');
};
