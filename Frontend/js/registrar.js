import { Carrito, Cliente } from "../js/clases.js";
import { Conexiones, CRUDCliente, Storage } from "./index_conclase.js";


Conexiones.Countries();

document.getElementById('boton-registrar').addEventListener('click',async ()=>{
    let cliente = Storage.crearCliente();
    console.log(cliente);
    try {
        let resultado = await CRUDCliente.registrar_usuario({PAPEL:'Usuario',NOMBRE1:cliente.nombre1,NOMBRE2:cliente.nombre2,APELLIDO1:cliente.apellido1,
        APELLIDO2:cliente.apellido2,USERNAME:cliente.username,PASSWORD_USUARIO:cliente.password,DIRECCION:cliente.direccion,
        ENVIOS:cliente.envios, PAIS: cliente.pais, FORMA_PAGO: cliente.pago, PROPIETARIO_TARJETA: cliente.propietario,CADUCIDAD:cliente.caducidad, NUM_TARJETA: cliente.tarjeta, PASSWORD_USUARIO: cliente.password, MAIL: cliente.mail, TELEFONO: cliente.tel,CVV: cliente.cvv } )
        alert(resultado);
        if (resultado === 'Usuario registrado'){
            let nuevoCliente = await CRUDCliente.consultar_usuario({USERNAME: cliente.username, PASSWORD_USUARIO: cliente.password});
            localStorage.setItem('usuarioActivo',JSON.stringify(nuevoCliente));
            let carrito = new Carrito(cliente.username);
            localStorage.setItem('carritoActivo',JSON.stringify(carrito));
            console.log(nuevoCliente);
            console.log(carrito);
            window.open('../index.html','_self')
        }
    } catch (error) {
        console.log(error);
    }

    

})


