const Categoria = require('../models/model.categoria');

class Category {  

  createCategory = async (nombre, imagen) => {
    try {
      const categoria = await Categoria.create({ NOMBRE: nombre, IMAGEN: imagen});
      console.log("Categoria creada con exito [SERVICE]");
      return categoria;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  readCategory = async () => {
    const categorias = await Categoria.findAll();      
    return categorias;
  }

  updateCategory = async (id, nombre, imagen) => {
    try {      
      await Categoria.update({ NOMBRE: nombre, IMAGEN: imagen },
      {
        where: { ID_CATEGORIA: id }
      });  
      console.log("Categoria actualizada con exito [SERVICE]");
      return "Categoria actualizada con exito [SERVICE]";
    } catch (error) {
      console.log(error);
      return error;
    }  
  }

  deleteCategory = async (id, nombre, imagen) => {
    try {      
      await Categoria.destroy({
        where: {
          ID_CATEGORIA: id,
          NOMBRE: nombre,
          IMAGEN: imagen
        }
      });  
      console.log("Categoria eliminada con exito [SERVICE]");
      return "Categoria eliminada con exito [SERVICE]";
    } catch (error) {
      console.log(error);
      return error;
    }  
  }
}

module.exports = Category