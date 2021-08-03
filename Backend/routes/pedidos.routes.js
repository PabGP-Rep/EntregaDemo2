const { HacerPedido,buscarMaximoPedido } = require("../controller/pedidos.controlador");
const sequelize = require("../db/conexion");
const Pedidodb = require("../models/pedido.modelo");


module.exports = (app) =>{
    app.post('/pedidos/nuevo',HacerPedido);

    app.get('/pedidos/maximo',buscarMaximoPedido)

}