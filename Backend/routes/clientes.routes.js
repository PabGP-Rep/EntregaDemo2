const { clienteDatosEnviados, checarCliente, puedeVerInfo, clienteUsuarioEnviado, clienteExiste, validarToken } = require("../Midleware/clientes.middlewares");
const { crearCliente, buscarCliente, listarClientes, actualizarCliente, eliminarCliente} = require('../controller/clientes.controlador');

module.exports = (app) =>{

  app.post('/clientes/nuevo', clienteDatosEnviados, clienteExiste, crearCliente);

  app.post('/clientes/miperfil', clienteUsuarioEnviado,checarCliente,  buscarCliente);

  app.post('/clientes', clienteUsuarioEnviado, checarCliente, validarToken, listarClientes);

  app.post('/clientes/actualizar',clienteUsuarioEnviado, actualizarCliente);

  app.post('/clientes/eliminar',clienteUsuarioEnviado,eliminarCliente);      
      
}