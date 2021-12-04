//FUNCIONES CRUD DE LA TABLA "usuarios" DE LA BASE DE DATOS

import executeQuery from "../services/mysql.service";

//Función: OBTENER USUARIO
/*
Método FrontEnd: GET
Propiedad del método: params
Respuesta BackEnd: JSON (mensaje, datos de BD)
*/
const obtenerUsuario = async(req, res) => {
    const{id} = req.params;
    try{
        const response = await executeQuery(`SELECT * FROM usuarios WHERE id_usuario = ${id}`);
        const data = { //JSON
            message: `${response.length} datos encontrados`,
            datos: response.length > 0 ? response[0]: null
        }
        res.json(data);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}


//Función: AGREGAR USUARIO
/*
Método FrontEnd: POST
Propiedad del método: body -Json
Respuesta BackEnd: JSON (mensaje)
*/
const agregarUsuario = async(req, res) => {
    const {nombre, apellido, telefono, email, status, password, identificacion, tipo, recuperar, rol} = req.body;
    try{
        const response = await executeQuery(`INSERT INTO usuarios (nombre_usuario, apellido_usuario, telefono_usuario, email_usuario, status_usuario, password_usuario, identificacion_usuario, tipoIdentificacion_usuario, recuperar_password_usuario, rol_usuario) VALUES ('${nombre}', '${apellido}', '${telefono}', '${email}', '${status}', '${password}', '${identificacion}', '${tipo}', ${recuperar}, '${rol}')`);
        res.status(201).json({message: "created", id: response.insertId});
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}


//Función: ACTUALIZAR USUARIO
/*
Método FrontEnd: PUT
Propiedad del método: body -Json, params -URL
Respuesta BackEnd: JSON (mensaje)
*/
const actualizarUsuario = async(req, res) => {
    const {nombre, apellido, telefono, email, status, password, identificacion, tipo, recuperar, rol} = req.body;
    const {id} = req.params;
    try{
        const response = await executeQuery(`UPDATE usuarios SET nombre_usuario = '${nombre}', apellido_usuario = '${apellido}', telefono_usuario = '${telefono}', email_usuario = '${email}', status_usuario = '${status}', password_usuario = '${password}', identificacion_usuario = '${identificacion}', tipoIdentificacion_usuario = '${tipo}', recuperar_password_usuario = ${recuperar}, rol_usuario = '${rol}' WHERE id_usuario = ${id}`);
        console.log(response);
        if (response.affectedRows > 0){ //Si hubo actualización
            res.json({message: 'updated'});
        }else{
            res.status(404).json({message: `No existe registro con id: ${id}`});
        }
    }catch(error){
        console.log(error);
        console.log(nombre);
        res.status(500).send(error);
    }
}


//Función: DESACTIVAR USUARIO (alterar campo "status" = "Inactivo")
/*
Método FrontEnd: PUT
Propiedad del método: params -URL
Respuesta BackEnd: JSON (mensaje)
*/
const desactivarUsuario = async(req, res) => {
    const {id} = req.params;
    try{
        const response = await executeQuery(`UPDATE usuarios SET status_usuario = "Inactivo" WHERE id_usuario = ${id}`);
        console.log(response);
        if (response.affectedRows > 0){
            res.json({message: "disabled", id: id});
        }else{
            res.status(404).json({message: `No existe registro con id: ${id}`});
        }
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}


//Función: VALIDAR USUARIO
/*
Método FrontEnd: GET
Propiedad del método: headers
Respuesta BackEnd: JSON (mensajes)
*/
const validarUsuario = async(req, res) => {
    
    const{email, password} = req.headers;
    try{
        const response = await executeQuery(`SELECT password_usuario, id_usuario FROM usuarios WHERE email_usuario = '${email}'`);
        if (response.length > 0){
            res.json({message: response[0].password_usuario == password ? 'correct' : 'incorrect', id: response[0].id_usuario});
        }else{
            res.json({message: 'not found'});
        }
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

const iniciarSesion = async (req, res) => {

} 

const resetPassword = async (req, res) => {

}


//Exportar múltiples funciones para ser usadas en el archivo "usuarios.ts"
export {obtenerUsuario, actualizarUsuario, agregarUsuario, desactivarUsuario, validarUsuario, iniciarSesion, resetPassword}
