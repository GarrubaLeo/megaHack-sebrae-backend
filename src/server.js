const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./routes')
require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(router);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({ error: error.message });
});