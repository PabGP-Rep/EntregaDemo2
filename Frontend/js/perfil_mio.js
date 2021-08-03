import { Cliente } from "./clases.js";
import { CRUDCliente, Storage } from "./index_conclase.js";

Storage.subirNuevoCliente();


document.getElementById('boton-actualizar').addEventListener('click', async ()=>{
    try {
        let cliente = Storage.crearCliente();
        let resultado = await CRUDCliente.actualizar_usuario({PAPEL:'Usuario',NOMBRE1:cliente.nombre1,NOMBRE2:cliente.nombre2,APELLIDO1:cliente.apellido1,
        APELLIDO2:cliente.apellido2,USERNAME:cliente.username,PASSWORD_USUARIO:cliente.password,DIRECCION:cliente.direccion,
        ENVIOS:cliente.envios, PAIS: cliente.pais, FORMA_PAGO: cliente.pago, PROPIETARIO_TARJETA: cliente.propietario,CADUCIDAD:cliente.caducidad, NUM_TARJETA: cliente.tarjeta, PASSWORD_USUARIO: cliente.password, MAIL: cliente.mail, TELEFONO: cliente.tel,CVV: cliente.cvv } )
        alert(resultado);
        let buscado =await CRUDCliente.consultar_usuario({USERNAME: document.getElementById('username').value,PASSWORD_USUARIO:document.getElementById('password').value});
        localStorage.setItem('usuarioActivo',JSON.stringify(buscado));
        Storage.subirNuevoCliente();
    } catch (error) {
        console.log(error);
    }
    
})

document.getElementById('boton-eliminar').addEventListener('click',async ()=>{
    try {
        let resultado = await CRUDCliente.borrar_usuario({USERNAME:document.getElementById('username').value,PASSWORD_USUARIO:document.getElementById('password').value})
        alert(resultado);
        if(resultado === 'Cliente eliminado correctamente') {
            Storage.borrar();
            window.open('../index.html','_self')
        }

    } catch (error) {
        console.log(error);
    }
})

