
const validarRol = (req, res, next) => {
  if (req.headers.isAdmin){
    next();
  }else{
    res.status(401).send("No tiene autorizacion");
  }
}

export default validarRol;
