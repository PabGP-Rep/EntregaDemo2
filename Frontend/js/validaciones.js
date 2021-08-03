function validarTxt(data){
  if (data == null || data == 0 || /^\s+$/.test(data)) {
    throw new Error('Alguno de los valores ingresados es incorrecto');    
  } else {
    return 'ok';    
  }
}

function validarNumero(data){
  if (data == null || data == 0 || !(/^[0-9]+$/.test(data))) {
    throw new Error('Alguno de los valores ingresados no es un numero entero');  
  } else {
    return 'ok';    
  }
}

function validarNumeroFloat(data){
  if (data == null || data == 0 || !(/^([0-9]*[.])?[0-9]+$/.test(data))) {
    throw new Error('Alguno de los valores ingresados no es un numero flotante'); 
  } else {
    return 'ok';    
  }
}

async function validarCategoriaID(id, token){
  let flag = 0;
  let url = 'http://localhost:3000/categ';
  let categoryList = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': token, 
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  console.log(categoryList.status);
  if (categoryList.status != 403) {
    let categoryList_json = await categoryList.json();
    console.log(categoryList_json);
    categoryList_json.forEach(element => {
    if(element.ID_CATEGORIA == id){
      flag = 1;
    }
    });
    console.log(flag);
    if (flag === 0)
      throw new Error('No existe tal categoria');    
  } else {
      throw new Error('No tienes permisos de accesso');    
  }  
}

async function validarCategoria(id, nombre, imagen, token ){
  let flag = 0;
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
    console.log(categoryList_json);
    categoryList_json.forEach(element => {
      if(element.ID_CATEGORIA == id && element.NOMBRE == nombre && element.IMAGEN == imagen){
        flag = 1;
      }
    });
    console.log(flag);
    if (flag === 0)
      throw new Error('No existe tal categoria');    
  } else {
    throw new Error('No tienes permisos de accesso');   
  } 
}

async function validarProductoId(idproducto, token){
  let flag = 0;
  let url = 'http://localhost:3000/productos';
  let productList = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': token, 
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  let productList_json = await productList.json();
  productList_json.forEach(element => {
    if(element.ID_PRODUCTO == idproducto){
      flag = 1;
    }
  });
  console.log(flag);
  if (flag === 0)
    throw new Error('No existe tal Id de producto');
}

async function validarProducto(idproducto, idcategoria, nombre, precio, imagen, token){
  let flag = 0;
  let url = 'http://localhost:3000/productos';
  let productList = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': token, 
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  let productList_json = await productList.json();
  productList_json.forEach(element => {
    if(element.ID_PRODUCTO == idproducto && element.ID_CATEGORIA == idcategoria && element.NOMBRE == nombre && element.PRECIO == precio && element.IMAGEN == imagen){
      flag = 1;
    }
  });
  console.log(flag);
  if (flag === 0)
    throw new Error('No existe tal producto');
}