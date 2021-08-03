
export async function categorias() {
    let url = 'http://localhost:3000/categorias';
    let categoriasConsulta = await fetch(url);
    let categoriasConsulta_json = await categoriasConsulta.json();
    return categoriasConsulta_json;
  }
  
  export async function ProductosporCategoria(categoria) {
    
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
    
    /*
    let url = `https://api.mercadolibre.com/sites/MLM/search?category=${categoria}`;
    let productos = await fetch(url);
    let productos_json = await productos.json();
    return productos_json.results;
  
    //let productos = await consultar(`sites/MLM/search?category=${categoria}`);
    //return productos.results;*/
  }
  
  /*
  export async function consultar(endpoit) {
      let conexion = await fetch('https://api.mercadolibre.com/'+endpoit);
      let conexion_json = await conexion.json();
      return conexion_json
  }
  
  export async function categorias() {
      let categoriasConsulta = await consultar('sites/MLM/categories');
      return categoriasConsulta;
  }
  
  export async function ProductosporCategoria(categoria) {
      let productos = await consultar(`sites/MLM/search?category=${categoria}`);
  
      return productos.results;
  }
  
  export async function productoImagenPorCategoria(categoria) {
      let productos = await ProductosporCategoria(categoria);
      return productos[0].thumbnail
  }
  */
  import { Carrito, Cliente } from "../js/clases.js";
  
  ///Categoria de prueba MLM1747
  
  export class estiloTarjeta {
      constructor() {
          this.contenedorPrimario = 'height: auto; width: 300px; border:5px solid black; background: linear-gradient(to bottom, #33ccff 0%, #66ccff 100%);display:flex;justify-content:center;align-items:center;background-size:cover; border-radius:15px;margin:20px ';
          this.contenedorSecundario = 'height: auto; width: 90%;border:1px solid black; display:flex;flex-direction:column; align-content:center;justify-content:center; border-radius:15px; margin:5%';
          this.imagen = 'heigh:100px;width:100px; margin: 15px;align-self:center';
          this.titulo = 'color:black; font-weight: bolder;font-family: verdana, align:center ;margin:10px'
          this.boton = 'color:white;width: 30%; align-self:center; margin: 15px; border-radius:4px; background:linear-gradient(135deg, #6e8efb, #a777e3);'
      }
  }
  
  let estilos = new estiloTarjeta();
  
  export async function renderizarCategorias () {
      para_carrusel();
      let division =  document.getElementById('division_principal_Index');
      division.innerHTML = "";
      let producto = ProductosporCategoria('MLM1747')
      let categoriasML = await categorias()
      .then((resp) =>{
          resp.forEach(async (element) => {
              let productos =await ProductosporCategoria(element.id);
              let imagen  = document.createElement('img');
              imagen.setAttribute('src',productos[0].thumbnail);
              imagen.setAttribute('style', estilos.imagen)
              let contenedorPrimario =document.createElement('div');
              contenedorPrimario.setAttribute('style',estilos.contenedorPrimario);
              let contenedorSecundario = document.createElement('div');
              contenedorSecundario.setAttribute('style',estilos.contenedorSecundario);
              let titulo = document.createElement('p');
              titulo.setAttribute('style', estilos.titulo)
              titulo.innerHTML = '<h4> Categoria</h4>'+ element.name
              let boton_visitar = document.createElement('button');
              boton_visitar.textContent = 'Ver más';
              boton_visitar.setAttribute('style', estilos.boton);
              contenedorSecundario.appendChild(imagen);
              contenedorSecundario.appendChild(titulo);
              boton_visitar.setAttribute('target','self');
              boton_visitar.setAttribute('type','button');
              boton_visitar.addEventListener('click', () =>{
                  renderizarProductos(element.id)
              })
              contenedorSecundario.appendChild(boton_visitar);
              contenedorPrimario.appendChild(contenedorSecundario);
              division.appendChild(contenedorPrimario);
  
  
          });
      })
  }
  
  export async function para_carrusel() {
      let micategoria = await categorias();
      for (let i = 0; i<3; i++) {
          let indice = Math.floor(Math.random()*micategoria.length);
          let contenedor = document.getElementById('imagencar'+i.toString());
          let productos_azar = await ProductosporCategoria(micategoria[indice].id);
          contenedor.setAttribute('src',productos_azar[0].thumbnail)
          let titulo = document.getElementById('carusel'+i.toString())
          titulo.textContent = '¿Quieres ver más? \n Checa nuestra categoría '+micategoria[indice].name;
          
      }
  }
  export async function renderizarProductos(categoria) {
      window.open('./html/productos.html',self);
      para_carrusel();
      let lista= [];
      let division = document.getElementById('division_principal_Index');
      division.innerHTML ="";
      let productos_categoria = await ProductosporCategoria(categoria)
      .then((resp) =>{
          resp.forEach(element => {
              console.log(element);
              lista.push(element);
              let imagen  = document.createElement('img');
              imagen.setAttribute('src',element.thumbnail);
              imagen.setAttribute('style', estilos.imagen)
              let contenedorPrimario =document.createElement('div');
              contenedorPrimario.setAttribute('style',estilos.contenedorPrimario);
              let contenedorSecundario = document.createElement('div');
              contenedorSecundario.setAttribute('style',estilos.contenedorSecundario);
              let titulo = document.createElement('p');
              titulo.setAttribute('style', estilos.titulo)
              titulo.innerHTML = '<h4>'+ element.title+'</h4>'
              let precio = document.createElement('h5');
              precio.textContent ='A tan solo: $'+element.price.toString();
              precio.setAttribute('style', estilos.titulo);
              let clientesFelices = document.createElement('h5');
              clientesFelices.textContent = element.sold_quantity+' Clientes satisfechos';
              clientesFelices.setAttribute('style',estilos.titulo);
              let quedan = document.createElement('h5');
              quedan.textContent ='Solo quedan: ' +element.available_quantity
              quedan.setAttribute('style',estilos.titulo);
              let boton_visitar = document.createElement('button');
              boton_visitar.textContent = 'Comprar';
              boton_visitar.setAttribute('style', estilos.boton);
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
      boton_atras.setAttribute('style', estilos.boton+'height:50px;width:100px');
      division.appendChild(boton_atras)
      boton_atras.addEventListener('click',() =>{
          window.open('./index.html','_self');
      })
  
  }
  
  
  
  export async function AgregarProducto(element) {
      let carrito = JSON.parse(window.localStorage.getItem('carritoActivo'));
      if (carrito !=null) {
          agregarAlista(carrito.lista,element)
          let carritos = JSON.parse(window.localStorage.getItem('usuariosEnSistema'));
          let encontrar = carritos.findIndex(element =>{
              return element.id === carrito.findIndex;
          })
          carrito.total+=element.price;
          carritos[encontrar] = carrito;
          window.localStorage.setItem('carritosRegistrados',JSON.stringify(carritos))
          window.localStorage.setItem('carritoActivo',JSON.stringify(carrito));
          console.log(carrito);
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
          let carritos = JSON.parse(window.localStorage.getItem('usuariosEnSistema'));
          let encontrar = carritos.findIndex(element =>{
              return element.id === carrito.findIndex;
          })
          carrito.total-=element.price;
          carritos[encontrar] = carrito;
          window.localStorage.setItem('carritosRegistrados',JSON.stringify(carritos))
          window.localStorage.setItem('carritoActivo',JSON.stringify(carrito));
          console.log(carrito);
      }else{
          alert('Debes iniciar sesion para empezar a comprar')
      }
  }
  
  async function quitarAlista(lista, element) {
      let encontrar = lista.findIndex(elemento =>{
          return element.id === elemento.id;
      })
      if(lista[encontrar].cantidad>1){
          lista[encontrar].cantidad-=1;
          lista[encontrar].total-=lista[encontrar].price;
      }else{
          lista.splice(encontrar,1);
      }
  }