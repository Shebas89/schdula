import executeQuery from "../services/mysql.services";

const obtenerServicios = async(req, res, next) => {
  try{
    const response = await executeQuery('select * from servicios');
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

const actualizarServicio = async(req, res, next) => {
  const {id} = req.params;
  const {nombre, descripcion, categoria, duracion, precio, id_empresa, id_usuario} = req.body;
  try{
    const response = await executeQuery(`update servicios set nombre_servicio = '${nombre}', descripcion_servicio = '${descripcion}', categoria_servicio = '${categoria}', duracion = ${duracion}, precio = ${precio}, id_empresa = ${id_empresa}, id_usuario = ${id_usuario} where id_servicio = ${id}`);
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
  const {nombre, descripcion, categoria, duracion, precio, id_empresa, id_usuario} = req.body;
  try{
    const response = await executeQuery(`insert into servicios (nombre_servicio, descripcion_servicio, categoria_servicio, duracion, precio, id_empresa, id_usuario) VALUES ('${nombre}', '${descripcion}', '${categoria}', ${duracion}, ${precio}, ${id_empresa}, ${id_usuario})`);
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

export { obtenerServicio, obtenerServicios, actualizarServicio, agregarServicio, eliminarServicio }
