const connection = require('../database/connection');

module.exports = {
    async create(request, response, next) {
        const { cnpj } = request.params;

        const {
            name,
            description,
            value
        } = request.body;

        try {
            const menuData = {
                name,
                description,
                value,
                image: request.file.filename,
                restaurant_cnpj : cnpj
            }

            await connection('menu').insert(menuData);

            return response.status(201).json({ message: 'Prato cadastro ao cardápio' })
        } catch (error) {
            next(error);
        }

    },

    async show(request, response, next) {
        const { cnpj } = request.params;

        try {
            const menu = await connection('menu')
                .where('restaurant_cnpj', cnpj)
                .select([
                    'name',
                    'description',
                    'value',
                    'image'
                ])

            return response.status(200).json(menu);
        } catch (error) {
            next(error);
        }
    }
}