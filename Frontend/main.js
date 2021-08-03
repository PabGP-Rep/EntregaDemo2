/// Esta parte trabaja solo con la pagina index
import { Renderizador, Storage } from "./js/index_conclase.js";

///En la página principal se muestran las categorias usuando la nueva clase Renderizador 
let renderizar = new Renderizador();
renderizar.renderizarCategorias();
renderizar.revisarPermisos();
///Se revisa el localstorage para saber si hay usuarios activos o no
let storage = new Storage();
storage.inciarBotones('');
storage.revisarStorage();
storage.revisarStorage();

