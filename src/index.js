const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 3333;

app.use(cors());
app.use(express.json());

app.use((error, response, request, next) => {
    response.status(error.status || 500);
    response.json({ error: error.message });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});