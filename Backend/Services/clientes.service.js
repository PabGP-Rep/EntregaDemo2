const Clientedb = require('../models/clientes.modelo');

class Client {

  createClient = async (clientData) => {
    try {
      const cliente = await Clientedb.create(clientData);
      console.log("Cliente creado con exito [SERVICE]");
      return cliente;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  searchClient = async (username) => {
    try {
      let encontrado = await Clientedb.findAll({
        where: { USERNAME: username }
      })
      console.log("Perfil encontrado con exito [SERVICE]");
      return encontrado
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  readClient = async () => {
    let clientes = await Clientedb.findAll();
    console.log("Consulta exitosa [SERVICE]");
    return clientes;  
  }

  updateClient = async (clientData) => {
    try {
      await Clientedb.update({
        NOMBRE1: clientData.NOMBRE1, NOMBRE2: clientData.NOMBRE2, PAPEL: clientData.PAPEL, 
        APELLIDO1: clientData.APELLIDO1, APELLIDO2: clientData.APELLIDO2, DIRECCION: clientData.DIRECCION,
        ENVIOS: clientData.ENVIOS, PAIS: clientData.PAIS, FORMA_PAGO: clientData.FORMA_PAGO,
        PROPIETARIO_TARJETA: clientData.PROPIETARIO_TARJETA, NUM_TARJETA: clientData.NUM_TARJETA, 
        CADUCIDAD: clientData.CADUCIDAD, PASSWORD_USUARIO: clientData.PASSWORD_USUARIO, CVV: clientData.CVV, 
        MAIL: clientData.MAIL, TELEFONO: clientData.TELEFONO
      },
      {
          where: {USERNAME: clientData.USERNAME}
      });
      console.log("Cliente actualizado correctamente [SERVICE]");
      return "Cliente actualizado correctamente";
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  deleteClient = async (username) => {
    try {
      await Clientedb.destroy({
        where:{
          USERNAME: username
        }
      })
    //sequelize.query(`INSERT INTO CLIENTES_DADOS_BAJA(USERNAME) VALUES (${username})`);
    console.log("Cliente eliminado correctamente [SERVICE]");
    return "Cliente eliminado correctamente";
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = Client;