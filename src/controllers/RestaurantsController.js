const connection = require('../database/connection');
const { search } = require('../routes');

module.exports = {
    async create(request, response, next) {
        const {
            cnpj,
            name,
            latitude,
            longitude,
            uf,
            city,
        } = request.body;

        try {
            const trx = await connection.transaction();

            const restaurantData = {
                cnpj,
                name,
                image: request.file.filename,
                latitude,
                longitude,
                uf,
                city,
            };

            await trx('restaurants').insert(restaurantData);

            await trx.commit();

            return response.json({
                ...restaurantData
            })
        } catch (error) {
            next(error);
        }
    },

    async show(request, response, next) {
        const { cnpj } = request.params;

        try {
            const restaurant = await connection('restaurants').where('cnpj', cnpj).first();

            if (!restaurant) {
                response.status(400).json({ error: 'Restaurant not found' })
            }

            const precautions = await connection('precautions')
                .join('restaurants_precautions', 'restaurants_precautions.id', '=', 'precautions.id')
                .where('restaurants_precautions.restaurant_cnpj', cnpj)
                .select('title', 'image');

            return response.json({ restaurant, precautions });
        } catch (error) {
            next(error);
        }
    },

    async indexLocalization(request, response) {
        const { city } = request.query;

        const restaurants = await connection('restaurants')
            .where('city', city)
            .distinct();

        response.status(200).json(restaurants);
    },

    async index(request, response, next) {

        const { name } = request.query;

        try {
            const restaurants = await connection('restaurants')
                .where('name', 'like', '%' + name + '%')
                .select('*');

            return response.status(200).json(restaurants);
        } catch (error) {
            next(error);
        }

    },
}