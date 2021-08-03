const sequelize = require('../db/conexion');
const Ordendb = require('../models/orden.modelo');

class Orden {

    nuevaOrden = async(datos) => {
        try {
            await Ordendb.create(datos)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    maximaOrden = async(req,res) => {
        console.log('masximo');
        try {
            let resultado = await Ordendb.findAll({
                attributes: [[sequelize.fn('MAX',sequelize.col('ID_ORDEN')),'MAX']],
                raw:true
            })
            let maximo = resultado[0].MAX;
            return maximo
        } catch (error) {
            throw new Error('Ha habido un error al encontrar la maxima orden')
        }
    }
}


module.exports = Orden;