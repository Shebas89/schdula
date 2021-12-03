import { query } from "express";
import { isNamedExportBindings } from "typescript";
import executeQuery from "../services/mysql.service";

const obtenerServicios = async(req, res, next) => {
  try{
    const query = `select s.id_servicio as id, s.nombre_servicio as nombre, s.descripcion_servicio as descripcion, s.categoria_servicio as categoria,
    s.duracion as duracion, s.precio as precio, e.nombre_empresa as empresa, u.nombre_usuario as empleado from servicios s 
    inner join usuarios u on s.id_usuario = u.id_usuario 
    inner join empresas e on s.id_empresa = e.id_empresa 
    where s.estado_servicio = 'Activo'
    order by s.id_servicio`
    const response = await executeQuery(query);
    const data = {
      message: `${response.length} datos encontrados`,
      datos: response.length > 0 ? response : null
    }
    res.json(data);
  }catch(error){
    next(error);
  };
}

const obtenerServicio = async(req, res, next) => {
  const {id} = req.params;
  try{
    const response = await executeQuery(`select * from servicios where id_servicio = ${id}`); 
    const data = {
      message: `${response.length} dato encontrado`,
      datos: response.length > 0 ? response[0] : null
    }
    res.json(data);
  }catch(error){
    next(error);
  };
}

const obtenerServiciosPorCategoria = async(req, res, next) => {
  const {categoria} = req.query;
  try{
    const response = await executeQuery(`select * from servicios where categoria_servicio = '${categoria}' and estado_servicio = 'Activo'`); 
    const data = {
      message: `${response.length} dato encontrado`,
      datos: response.length > 0 ? response : null
    }
    res.json(data);
  }catch(error){
    next(error);
  };
}

const actualizarServicio = async(req, res, next) => {
  const {id} = req.params;
  const {nombre, descripcion, categoria, duracion, precio, id_empresa, empleado} = req.body;
  let response_user:any;
  try{
    response_user = await executeQuery(`select id_usuario from usuarios where nombre_usuario = '${empleado}'`);
    console.log(response_user[0])
  }catch(error){
    next(error);
  };
  const id_usuario:number = response_user[0].id_usuario;
  console.log(id_usuario);
  const query = `update servicios set nombre_servicio = '${nombre}', descripcion_servicio = '${descripcion}', categoria_servicio = '${categoria}', duracion = ${duracion}, precio = ${precio}, id_empresa = ${id_empresa}, id_usuario = ${id_usuario} where id_servicio = ${id}`;
  try{
    const response = await executeQuery(query);
    console.log(response);
    if(response.affectedRows > 0)
      res.json({message: 'updated'});
    else
      res.status(200).json({message: `No existe registro con id: ${id}`});
  }catch(error){
    next(error);
  };
}

const agregarServicio = async(req, res, next) => {
  const {nombre, descripcion, categoria, duracion, precio, id_empresa, empleado} = req.body;
  let response_user:any;
  try{
    response_user = await executeQuery(`select id_usuario from usuarios where nombre_usuario = '${empleado}'`);
    console.log(response_user[0])
  }catch(error){
    next(error);
  };
  const id_usuario:number = response_user[0].id_usuario;
  console.log(id_usuario);
  const query =  `insert into servicios (nombre_servicio, descripcion_servicio, categoria_servicio, duracion, precio, id_empresa, id_usuario, estado_servicio) VALUES ('${nombre}', '${descripcion}', '${categoria}', ${duracion}, ${precio}, ${id_empresa}, ${id_usuario}, 'Activo')`
  console.log(query);
  try{
    const response = await executeQuery(query);
    console.log(response);
    res.status(201).json({message: 'Created', id: response.insertId});
  }catch(error){
    next(error);  
  };
}

const eliminarServicio = async(req, res, next) => {
  const {id} = req.params;
  try{
    const response = await executeQuery(`delete from servicios where id_servicio = ${id}`);
    console.log(response);
    if(response.affectedRows > 0)
      res.json({message: 'deleted'});
    else
      res.status(200).json({message: `No existe registro con id: ${id}`});
  }catch(error){
    next(error);
  }
}

const inactivarServicio = async(req, res, next) => {
  const {id} = req.params;
  const {nombre, descripcion, categoria, duracion, precio, id_empresa, id_usuario} = req.body;
  try{
    const response = await executeQuery(`update servicios set estado_servicio = 'Inactivo' where id_servicio = ${id}`);
    console.log(response);
    if(response.affectedRows > 0)
      res.json({message: 'deleted'});
    else
      res.status(200).json({message: `No existe registro con id: ${id}`});
  }catch(error){
    next(error);
  }
}

const obtenerCategoriasServicio = async(req, res, next) => {
  const query = "select categoria_servicio from servicios where estado_servicio = 'Activo' group by categoria_servicio";
  try{
    const response = await executeQuery(query); 
    const data = {
      message: `${response.length} dato encontrado`,
      datos: response.length > 0 ? response : null
    }
    res.json(data);
  }catch(error){
    next(error);
  };
}

export { obtenerServicio, obtenerServicios, actualizarServicio, agregarServicio, eliminarServicio, inactivarServicio, obtenerCategoriasServicio, obtenerServiciosPorCategoria }
