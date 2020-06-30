import express from 'express';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3333, () => {
    console.log('Servidor no ar');
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({ error: error.message});
});