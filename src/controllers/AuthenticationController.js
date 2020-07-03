const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    async authentication(request, response, next) {
        const { email, password } = request.body;

        const user = await connection('users')
            .where('email', email)
            .select('*')

        if(user.length < 1) {
            return response.status(401).json({ error: 'Falha na autenticação'})
        } else {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if(err) {
                    return response.status(401).json({ error: 'Usuário ou senha inválido'});
                }

                if(result) {
                    const token = jwt.sign({
                        id_user: user[0].id,
                        name: user[0].name,
                        email: user[0].email,
                        cpf: user[0].cpf
                    }, process.env.JWT_TOKEN, { expiresIn: '7d' });

                    return response.status(200).json({ message: 'Autenticado com sucesso', token });
                }

                return response.status(401).json({ error: 'Usuário ou senha inválido'});
            })
        }
    }
}