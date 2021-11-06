import express from 'express';

const app = express();
const port = 3000;

// Respuesta del servidor
app.get('/', (req, res) => {
    res.send('prueba del servidor');
});

app.listen(port, () => {
    return console.log(`servidor corriendo sobre el uerto ${port}`)
})