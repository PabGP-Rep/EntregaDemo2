///En este nuevo sistema se usan clases en la mayor parte de los casos para evitar repeticion de codigo
//Es más limpio y solo se conservan un par de funciones sueltas 

import { Carrito, Cliente } from "./clases.js";

export async function AgregarProducto(element) {
    let carrito = JSON.parse(localStorage.getItem('carritoActivo'));
    if (carrito !=null) {
        agregarAlista(carrito.lista,element)
        carrito.total+=element.price;
        window.localStorage.setItem('carritoActivo',JSON.stringify(carrito));
    }else{
        alert('Debes iniciar sesion para empezar a comprar')
    }
    
}


async function agregarAlista(lista,element) {
    let encontrar = lista.findIndex(elemento =>{
        return element.id === elemento.id;
    })
    if (encontrar=== -1) {
        lista.push({id:element.id,nombre:element.title,price:element.price,cantidad:1,total:element.price})
    }else {
        lista[encontrar].cantidad+=1;
        lista[encontrar].total+=element.price;
    }
}

export async function eliminarProducto(element) {
    let carrito = JSON.parse(window.localStorage.getItem('carritoActivo'));
    if (carrito !=null) {
        quitarAlista(carrito.lista,element)
        carrito.total = carrito.total - element.price
        localStorage.setItem('carritoActivo',JSON.stringify(carrito));
        console.log(JSON.parse(localStorage.getItem('carritoActivo')));
        //console.log(carrito);
    }else{
        alert('Debes iniciar sesion para empezar a comprar')
    }
}

async function quitarAlista(lista, element) {
    let encontrar = lista.findIndex(elemento =>{
        return element.id === elemento.id;
    })
    if(lista[encontrar].cantidad>1){
        lista[encontrar].total-=lista[encontrar].price;
        lista[encontrar].cantidad-=1;
    }else if(lista[encontrar].cantidad === 1 ){
        lista.splice(encontrar,1);
    }
    //console.log(lista[encontrar].cantidad);
}

export class Conexiones {
    constructor() {

    }

    async  categorias() {
        let url = 'http://localhost:3000/categorias';
        let categoriasConsulta = await fetch(url);
        let categoriasConsulta_json = await categoriasConsulta.json();
        return categoriasConsulta_json;
    }

    async ProductosporCategoria (categoria) {
        let parametros = { id: categoria };
        let url = 'http://localhost:3000/productos_categoria';
        let resultados = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(parametros)
        });

        let resultadosJson = await resultados.json();
        let data = resultadosJson.results;
        return data;
    };

    static async Countries() {
        let country_form = document.getElementById('country');
        let url = 'http://localhost:3000/paises';
        let countriesList = await fetch(url);
        let countriesList_json = await countriesList.json();
        ///let countriesList = await consultar('/countries')

        countriesList_json.forEach(element => {
        let option = document.createElement('option');
                option.textContent = element.name;
                country_form.appendChild(option);  
        });
    }
}

export class estiloTarjeta {
    constructor() {
        this.contenedorPrimario = 'height: auto; width: 300px; border:5px solid black; background: linear-gradient(to bottom, #33ccff 0%, #66ccff 100%);display:flex;justify-content:center;align-items:center;background-size:cover; border-radius:15px;margin:20px ';
        this.contenedorSecundario = 'height: auto; width: 90%;border:1px solid black; display:flex;flex-direction:column; align-content:center;justify-content:center; border-radius:15px; margin:5%';
        this.imagen = 'heigh:100px;width:100px; margin: 15px;align-self:center';
        this.titulo = 'color:black; font-weight: bolder;font-family: verdana, align:center ;margin:10px'
        this.boton = 'color:white;width: 30%; align-self:center; margin: 15px; border-radius:4px; background:linear-gradient(135deg, #6e8efb, #a777e3);'
    }
}

export class Renderizador {
    constructor() {

        this.conexiones = new Conexiones(),
        this.estilos = new estiloTarjeta()
    }

    async paraCarrusel() {

        let micategoria = await this.conexiones.categorias();
        for (let i = 0; i<3; i++) {

            let indice = Math.floor(Math.random()*micategoria.length);
            let contenedor = document.getElementById('imagencar'+i.toString());
            let productos_azar = await this.conexiones.ProductosporCategoria(micategoria[indice].id);
            contenedor.setAttribute('src',productos_azar[0].thumbnail);
            let titulo = document.getElementById('carusel'+i.toString());
            titulo.textContent = '¿Quieres ver más? \n Checa nuestra categoría '+micategoria[indice].name;
            
        };
    }

    async renderizarCategorias() {

        this.paraCarrusel();
        let division =  document.getElementById('division_principal_Index');
        division.innerHTML = "";
        let producto = this.conexiones.ProductosporCategoria('MLM1747')

        let categoriasML = await this.conexiones.categorias()

        .then((resp) =>{

            resp.forEach(async (element) => {
                let productos =await this.conexiones.ProductosporCategoria(element.id);

                let imagen  = document.createElement('img');
                imagen.setAttribute('src',productos[0].thumbnail);
                imagen.setAttribute('style', this.estilos.imagen)
                let contenedorPrimario =document.createElement('div');
                contenedorPrimario.setAttribute('style',this.estilos.contenedorPrimario);
                let contenedorSecundario = document.createElement('div');
                contenedorSecundario.setAttribute('style',this.estilos.contenedorSecundario);
                let titulo = document.createElement('p');
                titulo.setAttribute('style', this.estilos.titulo)
                titulo.innerHTML = '<h4> Categoria</h4>'+ element.name
                let boton_visitar = document.createElement('button');
                boton_visitar.textContent = 'Ver más';
                boton_visitar.setAttribute('style', this.estilos.boton);
                contenedorSecundario.appendChild(imagen);
                contenedorSecundario.appendChild(titulo);
                boton_visitar.setAttribute('target','self');
                boton_visitar.setAttribute('type','button');
                boton_visitar.addEventListener('click', () =>{
                    window.localStorage.setItem('categoria', JSON.stringify(element.id));
                    window.open('./html/productos.html','_self');
                })
                contenedorSecundario.appendChild(boton_visitar);
                contenedorPrimario.appendChild(contenedorSecundario);
                division.appendChild(contenedorPrimario);


            });
        })
    }
    
    async renderizarProductos() {
        let categoria = JSON.parse(window.localStorage.getItem('categoria'));
        this.paraCarrusel();
        let lista= [];
        let division = document.getElementById('division_principal_Productos');
        let productos_categoria = await this.conexiones.ProductosporCategoria(categoria)
        .then((resp) =>{
            resp.forEach(element => {
                //console.log(element);
                lista.push(element)
                let imagen  = document.createElement('img');
                imagen.setAttribute('src',element.thumbnail);
                imagen.setAttribute('style', this.estilos.imagen)
                let contenedorPrimario =document.createElement('div');
                contenedorPrimario.setAttribute('style',this.estilos.contenedorPrimario);
                let contenedorSecundario = document.createElement('div');
                contenedorSecundario.setAttribute('style',this.estilos.contenedorSecundario);
                let titulo = document.createElement('p');
                titulo.setAttribute('style', this.estilos.titulo)
                titulo.innerHTML = '<h4>'+ element.title+'</h4>'
                let precio = document.createElement('h5');
                precio.textContent ='A tan solo: $'+element.price.toString();
                precio.setAttribute('style', this.estilos.titulo);
                let clientesFelices = document.createElement('h5');
                clientesFelices.textContent = element.sold_quantity+' Clientes satisfechos';
                clientesFelices.setAttribute('style',this.estilos.titulo);
                let quedan = document.createElement('h5');
                quedan.textContent ='Solo quedan: ' +element.available_quantity
                quedan.setAttribute('style',this.estilos.titulo);
                let boton_visitar = document.createElement('button');
                boton_visitar.textContent = 'Comprar';
                boton_visitar.setAttribute('style', this.estilos.boton);
                contenedorSecundario.appendChild(imagen);
                contenedorSecundario.appendChild(titulo);
                contenedorSecundario.appendChild(precio);
                contenedorSecundario.appendChild(clientesFelices);
                contenedorSecundario.appendChild(quedan);
                boton_visitar.setAttribute('type','button');
                boton_visitar.addEventListener('click', () =>{
                    AgregarProducto(element);
                })
                contenedorSecundario.appendChild(boton_visitar);
                contenedorPrimario.appendChild(contenedorSecundario);
                division.appendChild(contenedorPrimario);

            });
        });
        let boton_atras = document.createElement('button');
        boton_atras.setAttribute('type', 'button')
        boton_atras.textContent = 'Atras'
        boton_atras.setAttribute('style',this.estilos.boton+'height:50px;width:100px');
        division.appendChild(boton_atras)
        boton_atras.addEventListener('click',() =>{
            window.open('../index.html','_self');
        })
    }

    revisarPermisos() {
      if(JSON.parse(localStorage.getItem('usuarioActivo'))!==null) {
          let usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
          console.log("Permisos");
          console.log(usuario[0].cliente[0].PAPEL);
          if (usuario[0].cliente[0].PAPEL != 'ADMIN') {            
            document.getElementById('productosAdmin').className = "nav-item visually-hidden";
            document.getElementById('categoriasAdmin').className = "nav-item visually-hidden";
          }
      }
  }



}




export class Storage {
    constructor() {

    }

    inciarBotones(direccion) {
        var texto = "";
        const searchButton = document.getElementById('search-button');
        const searchInput = document.getElementById('search-input');

        searchButton.addEventListener('click', () => {
            const inputValue = searchInput.value;
            sessionStorage.setItem("textoBusqueda", inputValue);
            window.location.href = direccion+"./Pagina_Resultados/Resultados.html"    
        });

        document.getElementById('salirindex').addEventListener('click',()=> {
            if (JSON.parse(window.localStorage.getItem('usuarioActivo'))!==null){
                window.localStorage.removeItem('usuarioActivo');
                window.localStorage.removeItem('carritoActivo');
                window.open(direccion+'./html/login.html','_self');
            }
        })

        document.getElementById('facturacionindex').addEventListener('click',()=> {
            if (JSON.parse(window.localStorage.getItem('usuarioActivo'))!==null) {
                window.open(direccion+'./html/checkout_demo.html','_self')
            }else{
                alert('Para ver tus productos debes iniciar sesion')
            }
        })

        document.getElementById('perfil_activo').addEventListener('click',()=>{
            if (JSON.parse(window.localStorage.getItem('usuarioActivo')) === null){
                window.open(direccion+'./html/login.html','_self');
            }else {
                window.open(direccion+'./html/perfil_mio.html','_self');
            }
        })

        document.getElementById('categoriasAdmin').addEventListener('click',()=> {
          window.open(direccion+'./html/Crud_categorias.html','_self');       
      })

      document.getElementById('productosAdmin').addEventListener('click',()=> {
        window.open(direccion+'./html/Crud_productos.html','_self');          
    })
    }

    revisarStorage() {
        if(JSON.parse(localStorage.getItem('usuarioActivo'))!==null) {
            //console.log(JSON.parse(localStorage.getItem('usuarioActivo')));
            let usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
            //console.log(JSON.parse(localStorage.getItem('carritoActivo')));
            let carrito = JSON.parse(localStorage.getItem('carritoActivo'));
            console.log(carrito);
            document.getElementById('usuarioactivado').textContent ='      Bienvenido de nuevo  ' + usuario[0].cliente[0].NOMBRE1;
            document.getElementById('usuarioactivado').setAttribute('style','color:white')
        }
    }

    static borrar() {
        localStorage.removeItem('usuarioActivo');
        localStorage.removeItem('carritoActivo');
    }

    static crearCliente = () =>{
        let cliente = new Cliente;
        cliente.nombre1 = document.getElementById('nombre1').value;
        cliente.nombre2 = document.getElementById('nombre2').value;
        cliente.apellido1 = document.getElementById('apellido1').value;
        cliente.apellido2 = document.getElementById('apellido2').value;
        cliente.username = document.getElementById('username').value;
        cliente.direccion = document.getElementById('direccion').value;
        cliente.envios = document.getElementById('envios').value;
        cliente.pais = document.getElementById('country').value;
        cliente.pago = document.getElementById('OpcionPago').value;
        cliente.propietario = document.getElementById('propietario').value;
        cliente.tarjeta =parseInt( document.getElementById('tarjeta').value,10);
        cliente.caducidad = document.getElementById('caducidad').value; 
        cliente.password = document.getElementById('password').value;
        cliente.cvv = document.getElementById('cvv').value;
        cliente.mail = document.getElementById('mail').value;
        cliente.tel = document.getElementById('telefono').value;
        return cliente
    }

    static subirNuevoCliente() {
        let usuarioActivo = JSON.parse(window.localStorage.getItem('usuarioActivo'));
        console.log(usuarioActivo[0].cliente[0]);
        document.getElementById('nombre1').value = usuarioActivo[0].cliente[0].NOMBRE1
        document.getElementById('nombre2').value = usuarioActivo[0].cliente[0].NOMBRE2;
        document.getElementById('apellido1').value = usuarioActivo[0].cliente[0].APELLIDO1;
        document.getElementById('apellido2').value = usuarioActivo[0].cliente[0].APELLIDO2;
        document.getElementById('username').value = usuarioActivo[0].cliente[0].USERNAME;
        document.getElementById('password').value = usuarioActivo[0].cliente[0].PASSWORD_USUARIO;
        document.getElementById('direccion').value = usuarioActivo[0].cliente[0].DIRECCION;
        document.getElementById('envios').value = usuarioActivo[0].cliente[0].ENVIOS;
        document.getElementById('country').value = usuarioActivo[0].cliente[0].PAIS;
        document.getElementById('OpcionPago').value = usuarioActivo[0].cliente[0].FORMA_PAGO;
        document.getElementById('propietario').value = usuarioActivo[0].cliente[0].PROPIETARIO_TARJETA;
        document.getElementById('tarjeta').value = usuarioActivo[0].cliente[0].NUM_TARJETA;
        document.getElementById('caducidad').value = usuarioActivo[0].cliente[0].CADUCIDAD;
        document.getElementById('cvv').value = usuarioActivo[0].cliente[0].CVV;
        document.getElementById('telefono').value = usuarioActivo[0].cliente[0].TELEFONO;
        document.getElementById('mail').value = usuarioActivo[0].cliente[0].MAIL;
    }
   
}


export class CRUDCliente {
    constructor(){

    }

    static async verusuarios(usuario){
        let busqueda = await fetch('http://localhost:3000/clientes',{
            method:'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                USERNAME: usuario.USERNAME,
                PASSWORD_USUARIO: usuario.PASSWORD_USUARIO
            })
        })
        const lista = busqueda.json();
        return lista;
    }
    static async registrar_usuario(usuario) {
        try {
            let agregar = await fetch("http://localhost:3000/clientes/nuevo",{
                method:'POST',
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    PAPEL: usuario.PAPEL,
                    NOMBRE1: usuario.NOMBRE1,
                    NOMBRE2:usuario.NOMBRE2,
                    APELLIDO1: usuario.APELLIDO1,
                    APELLIDO2: usuario.APELLIDO2,
                    USERNAME: usuario.USERNAME,
                    DIRECCION: usuario.DIRECCION,
                    ENVIOS: usuario.ENVIOS,
                    PAIS: usuario.PAIS,
                    FORMA_PAGO: usuario.FORMA_PAGO,
                    PROPIETARIO_TARJETA: usuario.PROPIETARIO_TARJETA,
                    NUM_TARJETA: usuario.NUM_TARJETA,
                    CADUCIDAD: usuario.CADUCIDAD,
                    PASSWORD_USUARIO: usuario.PASSWORD_USUARIO,
                    CVV: usuario.CVV,
                    MAIL: usuario.MAIL,
                    TELEFONO: usuario.TELEFONO
                }),

            })
            const agregar_json = agregar.json();
            return agregar_json;
        } catch (error) {
            console.log('nuevo'+error);
        }
      
    }

    static async actualizar_usuario(usuario) {
        let resultado = await fetch('http://localhost:3000/clientes/actualizar', {
            method:'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                PAPEL: usuario.PAPEL,
                NOMBRE1: usuario.NOMBRE1,
                NOMBRE2:usuario.NOMBRE2,
                APELLIDO1: usuario.APELLIDO1,
                APELLIDO2: usuario.APELLIDO2,
                USERNAME: usuario.USERNAME,
                DIRECCION: usuario.DIRECCION,
                ENVIOS: usuario.ENVIOS,
                PAIS: usuario.PAIS,
                FORMA_PAGO: usuario.FORMA_PAGO,
                PROPIETARIO_TARJETA: usuario.PROPIETARIO_TARJETA,
                NUM_TARJETA: usuario.NUM_TARJETA,
                CADUCIDAD: usuario.CADUCIDAD,
                PASSWORD_USUARIO: usuario.PASSWORD_USUARIO,
                CVV: usuario.CVV,
                MAIL: usuario.MAIL,
                TELEFONO: usuario.TELEFONO
            })
        })
        let resultado_json = resultado.json();
        return resultado_json;
    }
    
    static async borrar_usuario(usuario) {
        let resultado = await fetch('http://localhost:3000/clientes/eliminar', {
            method:'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                USERNAME: usuario.USERNAME,
                PASSWORD_USUARIO: usuario.PASSWORD_USUARIO
            })
        })
        let resultado_json = resultado.json();
        return resultado_json;
    }

    static async consultar_usuario(usuario) {
        let resultado = await fetch('http://localhost:3000/clientes/miperfil',{
            method:'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                USERNAME: usuario.USERNAME,
                PASSWORD_USUARIO: usuario.PASSWORD_USUARIO
            })
        })
        let resultado_json = resultado.json();
        console.log(resultado_json);
        return resultado_json;
    }
} 


export class Cobros {

    static async nuevoPedido(datos) {
        let resultado =  await fetch('http://localhost:3000/pedidos/nuevo',{
            method:'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                USERNAME: datos.USERNAME,
                ID_PEDIDO: datos.ID_PEDIDO,
                CANTIDAD: datos.CANTIDAD,
                ID_PRODUCTO: datos.ID_PRODUCTO,
                SUB_TOTAL: datos.SUB_TOTAL,
            })
        })
        let resultado_json = resultado.json();
        return resultado_json;

    }

    static async maximoPedido() {
        let resultado = await fetch('http://localhost:3000/pedidos/maximo',{
            method: 'GET',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json"
            }
        });
        let resultado_json = resultado.json();
        return resultado_json;
    }

    static async maximaOrden() {
        let resultado = await fetch('http://localhost:3000/ordenes/maxima',{
            method:'GET',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json"
            }
        });
        let resultado_json = resultado.json();
        return resultado_json;
    }

    static async nuevaOrden(datos) {
        let resultado = await fetch('http://localhost:3000/ordenes/nueva',{
            method:'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                USERNAME: datos.USERNAME,
                ID_PEDIDO: datos.ID_PEDIDO,
                ID_ORDEN: datos.ID_ORDEN,
                STATUS: 'En camino',
                TOTAL: datos.TOTAL
            })
        })
        let resultado_json = resultado.json();
        return resultado_json;
    }


}



