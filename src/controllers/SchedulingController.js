const connection = require('../database/connection');

module.exports = {
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