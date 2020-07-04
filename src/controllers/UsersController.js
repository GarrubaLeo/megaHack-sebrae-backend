const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const Login = require('../middlewares/Login');

module.exports = {
    async create(request, response, next) {
        const {
            name,
            email,
            cpf,
            password
        } = request.body;

        const passwordEncrypt = await bcrypt.hash(password, 10);

        try {
            const userData = {
                name,
                email,
                cpf,
                password: passwordEncrypt
            }

            await connection('users').insert(userData);

            return response.status(201).json(userData);

        } catch (error) {
            next(error);
        }
    },

    async index(request, response, next) {
        console.log(request.user.id_user);

        try {
            const users = await connection('users').select('*');

            return response.status(200).json(users);
        } catch (error) {
            next(error)
        }
    }
}