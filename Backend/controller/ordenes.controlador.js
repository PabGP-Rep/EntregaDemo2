const Orden = require("../Services/ordenes.service");
let orden = new Orden();

const HacerNuevaOrden = async(req,res)=>{
    let datos = req.body;
    try {
        await orden.nuevaOrden(datos);
        return res.status(200).json('Nueva orden agregada')
    } catch (error) {
        return res.status(400).json('Hubo un error al registrar la nueva orden')
    }
}


const Ordenmaxima = async (req,res) => {
    try {
        let resultado = await orden.maximaOrden();
        return res.status(200).json(resultado)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {HacerNuevaOrden,Ordenmaxima};