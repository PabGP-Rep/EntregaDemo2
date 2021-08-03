const Pedido = require("../Services/pedidos.service");
const pedido = new Pedido();

const HacerPedido = async(req,res) =>{
    let datos = req.body;
    try {
        await pedido.nuevoPedido(datos);
        return res.status(200).json('Pedido en camino')
    } catch (error) {
        return res.status(400).json('Error al realizar pedido')
    }
}

const buscarMaximoPedido = async (req,res) => {
    try {
        let resultado = await pedido.maximoPedido();
        return res.status(200).json(resultado)
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {HacerPedido,buscarMaximoPedido}