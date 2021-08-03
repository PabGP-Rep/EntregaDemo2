import { Renderizador,Storage } from "./index_conclase.js";
let renderizar = new Renderizador();
renderizar.revisarPermisos();
renderizar.renderizarProductos();
let storage = new Storage();
storage.inciarBotones('.');
storage.revisarStorage();