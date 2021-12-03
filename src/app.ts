import express from 'express';
import config from './config/config';
import errorHandler from './middlewares/error';
import serviciosRoutes from './routes/servicios';
import usuariosRoutes from "./routes/usuarios" 

const app = express();

// parseo para el body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Respuesta del servidor
serviciosRoutes(app);
usuariosRoutes(app);

app.use(errorHandler);

app.listen(config.PORT, () => {
    return console.log(`servidor corriendo sobre el puerto ${config.PORT}`)
})
