import executeQuery from "../services/mysql.services";

const obtenerServicios = async(req, res) => {
  try{
    const response = await executeQuery('select * from servicios');
    const data = {
      message: `${response.length} datos encontrados`,
      datos: response.length > 0 ? response : null
    }
    res.json(data);
  }catch(error){
    res.status(500).send(error);
  };
}

const obtenerServicio = async(req, res) => {
  const {id} = req.params;
  const response = await executeQuery(`select * from servicios where id = ${id}`);
  try{
    const data = {
      message: `${response.length} dato encontrado`,
      datos: response.length > 0 ? response[0] : null
    }
    res.json(data);
  }catch(error){
    res.status(500).send(error);
  };
}

const actualizarServicio = async(req, res) => {
  const {id} = req.params;
  const {nombre, descripcion, categoria, duracion, precio, id_negocio, id_empleado} = req.body;
  try{
    const response = await executeQuery(`update servicios set nombre = '${nombre}', descripcion = '${descripcion}', categoria = '${categoria}', duracion = ${duracion}, precio = ${precio}, id_negocio = ${id_negocio}, id_empleado = ${id_empleado} where id = ${id}`);
    console.log(response);
    if(response.affectedRows > 0)
      res.json({message: 'updated'});
    else
      res.status(200).json({message: `No existe registro con id: ${id}`});
  }catch(error){
    res.status(500).send(error);
  };
}

const agregarServicio = async(req, res) => {
  const {nombre, descripcion, categoria, duracion, precio, id_negocio, id_empleado} = req.body;
  try{
    const response = await executeQuery(`insert into servicios (nombre, descripcion, categoria, duracion, precio, id_negocio, id_empleado) VALUES ('${nombre}', '${descripcion}', '${categoria}', ${duracion}, ${precio}, ${id_negocio}, ${id_empleado})`);
    console.log(response);
    res.status(201).json({message: 'Created'});
  }catch(error){
    res.status(500).send(error);
  };
}

const eliminarServicio = async(req, res) => {
  const {id} = req.params;
  try{
    const response = await executeQuery(`delete from servicios where id = ${id}`);
    console.log(response);
    if(response.affectedRows > 0)
      res.json({message: 'deleted'});
    else
      res.status(200).json({message: `No existe registro con id: ${id}`});
  }catch(error){
    console.log(error);
    res.status(500).send(error);
  }
}

export { obtenerServicio, obtenerServicios, actualizarServicio, agregarServicio, eliminarServicio }
