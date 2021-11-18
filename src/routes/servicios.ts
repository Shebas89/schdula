import { Router } from "express";
import { actualizarServicio, agregarServicio, eliminarServicio, obtenerServicio, obtenerServicios } from "../controller/servicioControllers";

const serviciosRoutes = (app) => {
  const router = Router();
  app.use('/', router);

  router.get('/obtenerServicios', obtenerServicios);
  router.get('/obtenerServicio/:id', obtenerServicio);
  router.post('/agregarServicio', agregarServicio);
  router.put('/actualizarServicio/:id', actualizarServicio);
  router.delete('/eliminarServicio/:id', eliminarServicio);
}

export default serviciosRoutes;
