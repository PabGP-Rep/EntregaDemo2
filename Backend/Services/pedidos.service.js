const sequelize = require('../db/conexion');
const Pedidodb = require('../models/pedido.modelo');

class Pedido {

    nuevoPedido = async(datos) => {
        try {
            await Pedidodb.create(datos)
        } catch (error) {
            console.log(error.message);
        }
    }

    maximoPedido = async() => {
        try {
            let resultado = await Pedidodb.findAll({
                attributes: [[sequelize.fn('MAX',sequelize.col('ID_PEDIDO')),'MAX']],
                raw:true
            })
            let maximo = resultado[0].MAX;
            return maximo
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Pedido;