import { Router } from "express";
import { actualizarServicio, agregarServicio, eliminarServicio, obtenerServicio, obtenerServicios, inactivarServicio, obtenerCategoriasServicio, obtenerServiciosPorCategoria } from "../controller/servicioControllers";

const serviciosRoutes = (app) => {
  const router = Router();
  app.use('/', router);

  router.get('/obtenerServicios', obtenerServicios);
  router.get('/obtenerServicio/:id', obtenerServicio);
  router.post('/agregarServicio', agregarServicio);
  router.put('/actualizarServicio/:id', actualizarServicio);
  router.delete('/eliminarServicio/:id', eliminarServicio);
  router.put('/inactivarServicio/:id', inactivarServicio);
  router.get('/obtenerCategoriasServicio', obtenerCategoriasServicio);
  router.get('/obtenerServiciosPorCategoria', obtenerServiciosPorCategoria);
}

export default serviciosRoutes;
