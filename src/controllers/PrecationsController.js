const connection = require('../database/connection');

module.exports = {
    async index(request, response, next) {
        try {
            const precautions = await connection('precautions').select('*');

            const serializedPrecautions = precautions.map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    image: `http://localhost:3333/uploads/${item.image}`,
                }
            });

            return response.json(serializedPrecautions);
        } catch (error) {
            next(error);
        }
    }
}