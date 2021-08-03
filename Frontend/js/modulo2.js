//Funcion para llamar nuestra API y buscar productos por nombre
export async function obtenerDatos(query){
  try {
    let parametros = { nombre: query };
    let url = 'http://localhost:3000/productos_nombre';
    let resultados = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parametros)
    });
        
    let resultadosJson = await resultados.json();
    let data = resultadosJson.results;
    if (resultadosJson === 'Por favor ingrese una busqueda') {
      alert('Por favor ingrese una busqueda');
    }
    return data;
  } catch (error) {
    console.log('error '+error);
  }  
}

//Funcion para mostrar los resultados obtenidos de una busqueda
export async function crearResultados(query){
  const contenedor = document.querySelector('.row.row-cols-1.row-cols-sm-2.row-cols-md-5.g-3');
  const datos = await obtenerDatos(query);
  let vista = '';
  try {
    datos.forEach(element => {  
      vista += `
      <div class="col">
        <div class="card" >
          <img class="card-img-top" src=${element.thumbnail} alt="Card image cap" height="220">            
          <div class="card-body" >
            <ul class="list-group list-group-flush">
              <li class="list-group-item ">${element.title.substring(0,30)}</li>
              <li class="list-group-item">Condicion: ${element.condition} </li>
              <li class="list-group-item">Disponibilidad: ${element.available_quantity} unidades</li>
              <li class="list-group-item">Unidades Vendidas: ${element.sold_quantity} unidades</li>
            </ul>
            <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">Precio: $${(element.price).toString().substring(0,7)}</small>
              <div class="btn-group ">
                <a href=${element.permalink} class="btn btn-xsm btn-warning" role="button" aria-pressed="true">Mas Información</a>              
              </div>          
            </div>
          </div>
        </div>
      </div>      
      `
    });
    contenedor.innerHTML = vista;    
  } catch (error) {
    console.log("No Hay resultados que mostrar");
    
  }

}

//Funcion para realizar la busqueda de productos
export function buscarProductos(query){
  let busqueda = sessionStorage.getItem("textoBusqueda");
  if (query != busqueda){ busqueda = sessionStorage.setItem("textoBusqueda",query); }
   
  crearResultados(query);
}