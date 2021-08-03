const Client = require('../Services/clientes.service');
const {generarToken} = require('../Services/jwt.service')
const clientService = new Client();

const crearCliente = async (req, res) => {
  const clientData = req.body
  try {
    const cliente = await clientService.createClient(clientData);
    console.log("Cliente creado con exito [CONTROLLER]");
    res.status(201).json('Usuario registrado');
  } catch (error) {
    return res.status(500);
  }
}

const buscarCliente = async (req, res) =>{
  const username = req.body.USERNAME;
  try {
    const cliente = await clientService.searchClient(username);
    const user = await { "USERNAME": cliente[0].USERNAME, "ROLE": cliente[0].PAPEL };
    console.log(user);
    const token = await generarToken(user);
    const respuesta = [{cliente}, {token}]
    console.log("Perfil encontrado con exito [CONTROLLER]");
    res.status(200).json(respuesta);
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

const listarClientes = async (req, res) =>{
  try {
    let listaClientes = await clientService.readClient();
    console.log("Consulta exitosa [CONTROLLER]");
    res.status(200).json(listaClientes);
  } catch (error) {
    return res.status(500);
  }
}

const actualizarCliente = async (req, res) =>{
  const clientData = req.body
  try {
    let cliente = await clientService.updateClient(clientData);
    console.log("Cliente actualizado correctamente [CONTROLLER]");
    res.status(200).json('Usuario actualizado con exito');
  } catch (error) {
    throw new Error('Error al actualizar usuario')
  }
}

const eliminarCliente = async (req, res) =>{
  const username = req.body.USERNAME;
  try {
    let cliente = await clientService.deleteClient(username);
    console.log("Cliente eliminado correctamente [CONTROLLER]");
    res.status(200).json(cliente);
  } catch (error) {
    throw new Error('Error al eliminar usuario')
  }
}

module.exports = { crearCliente, buscarCliente, listarClientes, actualizarCliente, eliminarCliente}