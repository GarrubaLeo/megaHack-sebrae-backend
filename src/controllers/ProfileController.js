const connection = require('../database/connection');

module.exports = {
    async show(request, response, next) {
        try {
            const id = request.user.id_user;

            const data = await connection('users')
                .where('id', id)
                .select('*');

            return response.status(200).json(data);
            
        } catch (error) {
            next(error);
        }
    }
}