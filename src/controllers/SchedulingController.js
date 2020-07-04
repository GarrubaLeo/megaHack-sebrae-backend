const connection = require('../database/connection');

module.exports = {
    async showSchedulesUser(request, response, next) {
        const id_user = request.user.id_user;

        try {
            const schedules = await connection('schedules')
                .join('users', 'users.id', '=', 'schedules.id_user')
                .join('restaurants', 'restaurants.cnpj', '=', 'schedules.restaurant_cnpj')
                .where('users.id', id_user)
                .select([
                    'users.name',
                    'users.email',
                    'restaurants.name',
                    'schedules.date',
                    'schedules.hour',
                    'schedules.people_quantity'
                ]);

            return response.status(200).json(schedules);

        } catch (error) {
            next(error);
        }
    },

    async showSchedulesRestaurant(request, response, next) {
        const cnpj = request.params.cnpj;

        const schedules = await connection('schedules')
            .join('restaurants', 'restaurants.cnpj', '=', 'schedules.restaurant_cnpj')
            .join('users', 'users.id', '=', 'schedules.id_user')
            .where('restaurants.cnpj', cnpj)
            .select([
                'users.name',
                'users.email',
                'schedules.date',
                'schedules.hour',
                'schedules.people_quantity'
            ]);

        return response.status(200).json(schedules);
    },

    async create(request, response, next) {
        const cnpj = request.params.cnpj;
        const {
            date,
            hour,
            people_quantity
        } = request.body;

        try {
            await connection('schedules').insert({
                date,
                hour,
                people_quantity,
                id_user: request.user.id_user,
                restaurant_cnpj: cnpj
            });

            return response.status(201).json({ message: `Agendado para o dia ${date} às ${hour}` })
        } catch (error) {
            next(error);
        }
    }
}