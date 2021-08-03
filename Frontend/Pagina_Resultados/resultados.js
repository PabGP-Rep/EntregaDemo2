/*Javascript para las funcionalidades de la pagina de resultados de  Busqueda*/
import * as Funciones from '../js/modulo2.js';

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
let busqueda = sessionStorage.getItem("textoBusqueda");

searchButton.addEventListener('click', () => {
  const inputValue = searchInput.value;  
  Funciones.buscarProductos(inputValue); 
});

Funciones.buscarProductos(busqueda);