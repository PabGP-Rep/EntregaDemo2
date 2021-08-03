import {estiloTarjeta,AgregarProducto,eliminarProducto, CRUDCliente, Cobros} from './index_conclase.js'

let estilos_ = new estiloTarjeta;
let usuarioActivo = JSON.parse(window.localStorage.getItem('carritoActivo'));
console.log(usuarioActivo);
//console.log(usuarioActivo);
let productos = usuarioActivo.lista;

let estilos = {
    fila: "display:flex;flex-direction:row;justify-content:flex-start;border-bottom:1px solid black; margin-right: 10px ; font-size:50opx color:black",
    input: "display: flex; flex-direction:row; justify-content:center;align-content:center; color:black; "
}

productos.forEach(element => {
    let fila = document.createElement('tr');
    let producto = document.createElement('th');
    producto.textContent = element.nombre;
    let precio = document.createElement('th');
    let precio_input = document.createElement('input');
    precio_input.style = estilos.input;
    precio_input.disabled = true;
    precio_input.value = '$'+element.total;
    precio.appendChild(document.createElement('form').appendChild(precio_input))
    let cantidad = document.createElement('th');
    let cantidad_input = document.createElement('input');
    cantidad_input.style = estilos.input;
    cantidad_input.disabled = true;
    cantidad_input.value = element.cantidad;
    cantidad.appendChild(document.createElement('form').appendChild(cantidad_input));
    let botonmas = document.createElement('button');
    botonmas.setAttribute('style',estilos_.boton+'width:50px');
    botonmas.textContent = '+';
    botonmas.onclick = () =>{
        AgregarProducto(element);
        let nuevocarrito = JSON.parse(window.localStorage.getItem('carritoActivo'));
        let elemento = nuevocarrito.lista[nuevocarrito.lista.findIndex((elemento)=>{
            return element.id === elemento.id
        })]
        precio_input.value ='$' + elemento.total;
        cantidad_input.value = elemento.cantidad;
        document.getElementById('total').value = 'TOTAL: $  '+ Math.round(nuevocarrito.total*100)/100

    }
    let botonmenos = document.createElement('button');
    botonmenos.setAttribute('style',estilos_.boton+'width:50px')
    botonmenos.textContent = '-';
    botonmenos.onclick = ()=>{
        if (cantidad_input.value > 1){
            eliminarProducto(element);
            let nuevocarrito = JSON.parse(window.localStorage.getItem('carritoActivo'));
            let elemento = nuevocarrito.lista[nuevocarrito.lista.findIndex((elemento)=>{
                return element.id === elemento.id
            })]
            precio_input.value ='$' + elemento.total;
            cantidad_input.value = elemento.cantidad;
            document.getElementById('total').value ='TOTAL: $  ' + Math.round(nuevocarrito.total*100)/100
        }else{
            alert('Producto eliminado');
            eliminarProducto(element);
            let nuevocarrito = JSON.parse(window.localStorage.getItem('carritoActivo'));
            document.getElementById('total').value ='TOTAL: $  ' + Math.round(nuevocarrito.total*100)/100
            fila.remove();
        }

        
    }
    fila.appendChild(producto);
    fila.appendChild(cantidad);
    fila.appendChild(precio);
    fila.appendChild(botonmas);
    fila.appendChild(botonmenos);
    
    document.getElementById('tabla_checkout').appendChild(fila);
})
let nuevocarrito = JSON.parse(window.localStorage.getItem('carritoActivo'));
document.getElementById('total').value ='TOTAL: $  ' +Math.round( nuevocarrito.total*100)/100

document.getElementById('imprimir').addEventListener('click',()=>{
    window.print();
})

document.getElementById('pagar_factura').addEventListener('click',async ()=>{
    let confirmar = window.confirm('¿Seguro de que quieres realizar esta compra?')
    if (confirmar) {
        try {
            let maximopedido = await Cobros.maximoPedido();
            let maximaOrden = await Cobros.maximaOrden();
            let carrito = JSON.parse(localStorage.getItem('carritoActivo'));
            let usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
            
            carrito.lista.forEach((element)=> {
               let pedido = {ID_PEDIDO: maximopedido+1, 
                USERNAME: usuario[0].cliente[0].USERNAME, 
                ID_PRODUCTO: parseInt(element.id.slice(3)),
                CANTIDAD:  element.cantidad,
                SUB_TOTAL: element.total
                }
                console.log(pedido);
                Cobros.nuevoPedido(pedido);
                
            })
            let orden = {
                ID_ORDEN: maximaOrden+1,
                ID_PEDIDO: maximopedido+1,
                USERNAME: usuario[0].cliente[0].USERNAME,
                TOTAL: carrito.total
            }
            Cobros.nuevaOrden(orden);
            alert('Felicidades por tu compra!')
            carrito.lista = [];
            carrito.total = 0;
            localStorage.setItem('carritoActivo',JSON.stringify(carrito))
            window.open('../index.html','_self');
        } catch (error) {
            console.log(error.message);
        }
    }
})

