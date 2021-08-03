const {consultarCategorias, crearCategoria, actualizarCategoria, eliminarCategoria} = require('../controller/controller.categoria');
const Midleware = require("../Midleware/clientes.middlewares");

module.exports = (app) => {

  app.post('/categ', Midleware.validarToken, crearCategoria);

  app.get('/categ', Midleware.validarToken, consultarCategorias);
 
  app.put('/categ', Midleware.validarToken, actualizarCategoria);

  app.delete('/categ', Midleware.validarToken, eliminarCategoria);

}
