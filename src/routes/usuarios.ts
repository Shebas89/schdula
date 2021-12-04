//DEFINIR LAS RUTAS DE LA APLICACIÓN CON RESPECTO A LA ENTIDAD "usuarios" SEGÚN MOCKUPS

import { Router } from "express";
import { obtenerUsuario, actualizarUsuario, agregarUsuario, desactivarUsuario, validarUsuario, iniciarSesion, resetPassword } from "../controllers/usuariosControllers";

//Función: rutas hacia la entidad "usuarios"
const usuariosRoutes = (app) => {
    const router = Router();
    app.use('/', router);

    //1. Mockup: perfil --> Mostrar perfil del usuario
    router.get('/obtenerUsuario/:id', obtenerUsuario);

    //2. Mockup: perfil --> Actualizar información del usuario
    router.put('/actualizarUsuario/:id', actualizarUsuario);

    //3. Mockup: registrarse --> Agregar nuevo usuario
    router.post('/agregarUsuario', agregarUsuario);

    //4. Mockup: perfil --> Dar de baja (se cambia el "status" de "Activo" a "Inactivo")
    router.put('/desactivarUsuario/:id', desactivarUsuario);

    //5. Mockup: ingresar --> Validar credenciales
    router.get('/validarUsuario', validarUsuario);

    //7. Iniciar Sesion 
    router.post('/iniciarSesion', iniciarSesion);

    //6. Mockup: ingresar --> Recuperar contraseña 
    router.post('/resetPassword', resetPassword);
}


export default usuariosRoutes;
