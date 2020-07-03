const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];

        const decode = jwt.verify(
            token,
            process.env.JWT_KEY
        );

        request.id = decode.id;
        request.user = decode.name;
        request.email = decode.email;
        request.cpf = decode.cpf;

        next();
    } catch (error) {

        return response.status(401).json({ error: 'Falha na atutenticação'});

    }
}