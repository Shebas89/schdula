import express from 'express';
import config from './config/config';
import serviciosRoutes from './routes/servicios';

const app = express();

// parseo para el body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Respuesta del servidor
serviciosRoutes(app);

app.listen(config.PORT, () => {
    return console.log(`servidor corriendo sobre el puerto ${config.PORT}`)
})
