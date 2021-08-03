class Crud{
  constructor(){}

  static async consultarCategorias(token) {
    let tablaCategorias = document.getElementById('contenido-tabla');
    let url = 'http://localhost:3000/categ';
    let categoryList = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    if (categoryList.status != 403) {
      let categoryList_json = await categoryList.json();
      let vista = ``;
      categoryList_json.forEach(element => {
        vista += `      
          <tr>
            <th scope="row">${element.ID_CATEGORIA}</th>
            <td>${element.NOMBRE}</td>
            <td>${element.IMAGEN}</td>          
          </tr>    
        `;  
      });
      tablaCategorias.innerHTML = vista;      
    }
    else{
      alert(`Error: No posees permiso`);
    }    
  }

  static async registrarCategoria(nombre, imagen, token){  
    try {
      let parametros = { nombre: nombre, imagen: imagen };
      let url = 'http://localhost:3000/categ';
      console.log("registrando con"+ nombre, imagen);
      let agregar = await fetch(url,{
        method:'POST',
        headers: {
          'Authorization': token,
          "Accept": "application/json, text/plain, */*",         
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametros),
      })
      if(agregar.status != 403) {
        const agregar_json = agregar.json();
        console.log(agregar_json);
        return agregar_json;  
      } else{
        return false;
      }      
    }catch (error) {
      console.log('nuevo'+error);
    }  
  }

  static async actualizarCategoria(id, nombre, imagen, token){
    try {
      let parametros = { id: id, nombre: nombre, imagen: imagen };
      let url = 'http://localhost:3000/categ';
      console.log("actualizando con"+id, nombre, imagen);
      let agregar = await fetch(url,{
        method:'PUT',
        headers: {
          'Authorization': token,
          "Accept": "application/json, text/plain, */*",         
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametros),
      })
      if(agregar.status != 403) {
        const agregar_json = agregar.json();
        console.log(agregar_json);
        return agregar_json;  
      } else{
        return false;
      }  
    }catch (error) {
      console.log('nuevo'+error);
    }  
  }

  static async eliminarCategoria(id, nombre, imagen){
    try {
      let parametros = { id: id, nombre: nombre, imagen: imagen, token };
      let url = 'http://localhost:3000/categ';
      console.log("eliminando con"+id, nombre, imagen);
      let agregar = await fetch(url,{
        method:'DELETE',
        headers: { 
          'Authorization': token,
          "Accept": "application/json, text/plain, */*",         
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametros),
      })
      const agregar_json = await agregar.json();
      console.log(agregar_json);
      return agregar_json;
    }catch (error) {
      console.log('nuevo'+error);
    }  
  }
}

let rawtoken = JSON.parse(window.localStorage.getItem('usuarioActivo'))[1].token;
let token = "Bearer "+ rawtoken;
const botonConsulta = document.getElementById('boton-consultar');
const botonRegistro = document.getElementById('boton-registrar');
const botonActualizar = document.getElementById('boton-actualizar');
const botonEliminar = document.getElementById('boton-eliminar');

botonConsulta.addEventListener('click', () => {
  Crud.consultarCategorias(token);
});

botonRegistro.addEventListener('click', async () => {
  let campoNombre = document.getElementById('nombre1').value;
  let campoImagen = document.getElementById('imagen1').value;
  console.log("Registrando");
  try {
    validarTxt(campoNombre);
    if (await Crud.registrarCategoria(campoNombre, campoImagen, token)){
      alert('Categoria Registrada exitosamente');
    }
    else{
      alert(`Error: No posees permiso`);
    }
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);    
  }  
});

botonActualizar.addEventListener('click', async () => {
  let campoId = document.getElementById('id2').value;
  let campoNombre = document.getElementById('nombre2').value;
  let campoImagen = document.getElementById('imagen2').value;
  console.log("actualizando");
  try {
    validarNumero(campoId);
    await validarCategoriaID(campoId, token);
    validarTxt(campoNombre);
    if (await Crud.actualizarCategoria(campoId, campoNombre, campoImagen, token)){
      alert('Categoria Actualizada exitosamente');
    }
    else{
      alert(`Error: No posees permiso`);
    }
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);
  }  
});

botonEliminar.addEventListener('click', async () => {
  let campoId = document.getElementById('id3').value;
  let campoNombre = document.getElementById('nombre3').value;
  let campoImagen = document.getElementById('imagen3').value;
  console.log("eliminando");
  try {
    validarNumero(campoId);
    validarTxt(campoNombre);
    await validarCategoria(campoId, campoNombre, campoImagen, token);
    if (await Crud.eliminarCategoria(campoId, campoNombre, campoImagen, token)) {
      alert('Categoria Eliminada exitosamente');      
    } else {
      alert(`Error: No posees permiso`);
    }  
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);
  }  
});