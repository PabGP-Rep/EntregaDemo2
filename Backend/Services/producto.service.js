const Producto = require('../models/model.producto');

class Product {

  createProduct = async (idCategoria, nombre, precio, imagen) => {
    try {
      const producto = await Producto.create({ 
        ID_CATEGORIA: idCategoria,
        NOMBRE: nombre,
        PRECIO: precio,
        IMAGEN: imagen
      });
      console.log("Producto creado con exito [SERVICE]");
      return producto;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  readProduct = async () => {
    const productos = await Producto.findAll();      
    return productos;
  }

  updateProduct = async (id, idCategoria, nombre, precio, imagen) => {
    try {      
      await Producto.update({
        ID_CATEGORIA: idCategoria,
        NOMBRE: nombre,
        PRECIO: precio,
        IMAGEN: imagen
      },
      {
        where: {
          ID_PRODUCTO: id 
        }
      });  
      console.log("Producto actualizado con exito [SERVICE]");
      return "Producto actualizado con exito [SERVICE]";
    } catch (error) {
      console.log(error);
      return error;
    }  
  }

  deleteProduct = async (id, idCategoria, nombre, precio, imagen) => {
    try {      
      await Producto.destroy({
        where: {
          ID_PRODUCTO: id,
          ID_CATEGORIA: idCategoria,
          NOMBRE: nombre,
          PRECIO: precio,
          IMAGEN: imagen
        }
      }); 
      console.log("Producto eliminado con exito [SERVICE]");
      return "Producto eliminado con exito [SERVICE]";
    } catch (error) {
      console.log(error);
      return error;
    }  
  }
}

module.exports = Product