const { crearProducto, consultarProductos, actualizarProducto, eliminarProducto } = require('../controller/controller.producto');
const Midleware = require("../Midleware/clientes.middlewares");

module.exports = (app) => {

  //Alta de producto
  app.post('/productos', Midleware.validarToken, crearProducto);

  //Solicitud de productos
  app.get('/productos', Midleware.validarToken, consultarProductos);   

  //actualizar producto
  app.put('/productos', Midleware.validarToken, actualizarProducto);

  //eliminar producto
  app.delete('/productos', Midleware.validarToken, eliminarProducto);

}
