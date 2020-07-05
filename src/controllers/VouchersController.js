const connection = require('../database/connection');
const { index } = require('./UsersController');

module.exports = {
    async create(request, response, next) {
        const { cnpj } = request.params;

        const {
            title,
            description,
            value
        } = request.body;

        try {
            const voucherData = {
                title,
                description,
                value,
                restaurant_cnpj : cnpj
            }

            await connection('vouchers').insert(voucherData);

            return response.status(201).json({ message: 'Voucher cadastrado' })
        } catch (error) {
            next(error);
        }

    },

    async show(request, response, next) {
        const { cnpj } = request.params;

        try {
            const vouchers = await connection('vouchers')
                .where('restaurant_cnpj', cnpj)
                .select('*')

            return response.status(200).json(vouchers);
        } catch (error) {
            next(error);
        }
    },

    async index(request, response, next) {
        
        try {
            const vouchers = await connection('vouchers')
                .join('restaurants', 'restaurants.cnpj', '=', 'vouchers.restaurant_cnpj')
                .select([
                    'restaurants.name',
                    'title',
                    'description',
                    'value'
                ]);

            return response.status(200).json(vouchers);
        } catch (error) {
            next(error);
        }
    }
}