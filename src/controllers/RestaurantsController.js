const connection = require('../database/connection');

module.exports = {
    async create(request, response, next) {
        const { 
            cnpj,
            name,
            latitude,
            longitude,
            uf,
            city,
            precautions
        } = request.body;

        try {
            const trx = await connection.transaction();

            const restaurantData = {
                cnpj,
                name,
                image: 'image-fake',
                latitude,
                longitude,
                uf,
                city,
            };

            await trx('restaurants').insert(restaurantData);

            const precautionRegister = precautions.map((precaution) => {
                return {
                    restaurant_cnpj: cnpj,
                    precaution_id: precaution
                }
            });

            await trx('restaurants_precautions').insert(precautionRegister);

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
                .select('title');

            return response.json({ restaurant, precautions });
        } catch (error) {
            next(error)
        }
    },

    async index(request, response) {
        const restaurants = await connection('restaurants').select('*');

        return response.json(restaurants);
    }
}