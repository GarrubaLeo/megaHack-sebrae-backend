
exports.up = function (knex) {
    return knex.schema.createTable('vouchers', table => {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.text('description').notNullable()
        table.decimal('value').notNullable()

        table.string('restaurant_cnpj').references('cnpj').inTable('restaurants');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('vouchers');
};
