import { Carrito } from "./clases.js";
import { CRUDCliente } from "./index_conclase.js";


document.getElementById('boton_entrar_login').addEventListener('click',async ()=>{
    let buscarusuario = await CRUDCliente.consultar_usuario({USERNAME: document.getElementById('UsuarioInputLogin').value, PASSWORD_USUARIO: document.getElementById('UsuarioPasswordLogin').value})
    if (typeof buscarusuario === 'string'){
        alert(buscarusuario)
    }else {
        localStorage.setItem('usuarioActivo',JSON.stringify(buscarusuario));
        localStorage.setItem('carritoActivo', JSON.stringify(new Carrito(buscarusuario.USERNAME)));
        console.log('listo');
        window.open('../index.html','_self');
    }
});

document.getElementById('registrarse').addEventListener('click', ()=>{
    window.open('../html/perfil_registrar.html','_self');
})

