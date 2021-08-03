const rateLimit = require('express-rate-limit');
require('dotenv').config();

var corsOptions = {
  origin: function (origin, callback) {
    if (process.env.WHITE_LIST.indexOf(origin) !== -1) {
      callback(null, true)
    } else {      
      callback(new Error('Not allowed by CS'+origin))
    }
  }
}

const validacionDatos = function (req, res, next) {
  const { nombre } = req.body;
  
  if (!nombre) {
    return res.status(400)
        .json('Por favor ingrese una busqueda');
  }
  return next();
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // 20 peticiones maximo, cada 15 minutos
  message: 'Limite de accesos a la API excedido'
});

module.exports = { limiter, validacionDatos, corsOptions};