/*Javascript para las funcionalidades de la pagina de resultados de  Busqueda*/
////////////////////Resultados Barra de Busqueda
let busqueda = sessionStorage.getItem("textoBusqueda");
console.log(busqueda);

class Servicio {
    constructor(query) {
        this.url = 'https://api.mercadolibre.com/sites/MLA/search?q=';
        this.query = query;   
    }

    async getServicio(){
        let urlServicio = this.url + this.query;
        let Respuesta = await fetch(urlServicio);
        let data = await Respuesta.json();
        return data;
    }
}

async function renderData(OjetoServicio) {
    const titulo = document.getElementById('titulo-principal');
    titulo.innerHTML = "Resultados de busqueda: "+busqueda
    
    const data = await OjetoServicio.getServicio();    
    for(let i = 1; i < 7; i++) {        
        let imagen = document.getElementById(`imagen-${i}`);
        let nombre = document.getElementById(`nombre-${i}`);
        let condicion = document.getElementById(`condicion-${i}`);
        let disponibles = document.getElementById(`disponibles-${i}`);
        let vendidas = document.getElementById(`vendidas-${i}`);
        let precio = document.getElementById(`precio-${i}`);

        
        imagen.setAttribute('src', data.results[i].thumbnail);
        nombre.innerHTML = data.results[i].title;
        condicion.innerHTML = "Condicion: " + data.results[i].condition;
        disponibles.innerHTML = "Disponibilidad: " + data.results[i].available_quantity + " Unidades";
        vendidas.innerHTML = "Vendidas: " + data.results[i].sold_quantity + " Unidades";
        precio.innerHTML = data.results[i].price/1000 + " $";
        
    }
    console.log(data);
}

let newService = new Servicio(busqueda)
renderData(newService);


