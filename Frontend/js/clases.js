export class Carrito {

    constructor (id_cliente) {

        this.cliente = id_cliente;
        this.lista = [];
        this.total = 0;

    }

    async añadirProducto(id) {

        let producto_adding = new Product(id)
        let producto_adding_data = await producto_adding.consultarInfo_producto()
        .then((resp) => {
            let check = this.lista.findIndex((articulos) => {
                if (articulos.id == resp[0].body.id){
                    return true;
                }
            })
 
            if (check < 0) {
                let producto_nuevo = {id: resp[0].body.id, nombre: resp[0].body.title ,cantidad:1,precio:resp[0].body.price, total: resp[0].body.price};
                this.lista.push(producto_nuevo);
            }else {
                this.lista[check].total+=resp[0].body.price;
                this.lista[check].cantidad+=1;
            }
            this.total+=(resp[0].body.price);
            console.log(this.lista);
            console.log(this.total);
        })
        .catch((reject) => {console.log('err_conexion')});
    }

    async borrarProducto(id) {

        console.log('borrando');
        let producto_deleting = new Product(id);
        let producto_deleting_data = await producto_deleting.consultarInfo_producto()
        .then((resp) => {
            let check = this.lista.findIndex((articulos) => {
                if (articulos.id == resp[0].body.id){
                    return true;
                }
            });

            if (check >= 0) {
                if (this.lista[check].cantidad >= 1) {
                    this.lista[check].cantidad-=1;
                    this.lista[check].total-=this.lista[check].precio;
                }
                if (this.lista[check].cantidad == 0) {
                    this.lista.splice(check);
                }
            }else {
                console.log('err_noproducto_enlista');
            }
        })
        .catch((reject) => {console.log('err_conexion');})
    }

    async vaciarCarrito() {
        this.lista = [];
    }
}


export class Cliente  {
    constructor(nombre1,nombre2,apellido1,apellido2,username,password,direccion,envios,pais,pago,propietario,tarjeta,caducidad,cvv,mail,telefono){
        this.nombre1 = nombre1;
        this.nombre2 = nombre2;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.username = username;
        this.password = password;
        this.direccion = direccion;
        this.envios = envios;
        this.pais = pais;
        this.pago = pago;
        this.propietario =  propietario;
        this.tarjeta = tarjeta;
        this.caducidad = caducidad;
        this.cvv = cvv;
        this.mail = mail;
        this.tel = telefono;
        this.Carrito = new Carrito(this.username)
    }
}


class Product {

    constructor (id) {

        this.id = id;

    }
    async consultarInfo_producto () {

        let infoProducto = await fetch('https://api.mercadolibre.com/items?ids='+this.id);
        let infoProducto_json = infoProducto.json();
        return infoProducto_json;

    }

    async printInfo_producto () {
        let Info = await this.consultarInfo_producto();
        console.log(Info);
    }
}




