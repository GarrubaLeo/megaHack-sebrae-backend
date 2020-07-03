
exports.up = function (knex) {
    return knex.schema.createTable('restaurants_precautions', table => {
        table.increments('id').primary();

        table.string('restaurant_cnpj')
            .notNullable()
            .references('cnpj')
            .inTable('restaurants')

        table.integer('precaution_id')
            .notNullable()
            .references('id')
            .inTable('precautions')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('restaurants_precautions');
};
