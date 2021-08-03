const Category = require('../Services/categorias.service');

const categoryService = new Category();

const crearCategoria = async (req, res) => {
  const { nombre, imagen } = req.body
  try {
    const categoria = await categoryService.createCategory(nombre, imagen);
    console.log("Categoria creada con exito [CONTROLLER]");  
    res.status(201).json(categoria);
  } catch (error) {
    return res.status(500);
  }
}

const consultarCategorias = async (req, res) => {
  try {
    const categorias = await categoryService.readCategory();
    console.log("Consulta realizada con exito [CONTROLLER]");
    res.status(200).json(categorias);
  } catch (error) {
    return res.status(500);
  }
}

const actualizarCategoria = async (req, res) => {
  const { id, nombre, imagen } = req.body
  try {
    resultado = await categoryService.updateCategory(id, nombre, imagen);
    console.log("Categoria actualizada con exito [CONTROLLER]");
    res.status(200).json(resultado);
  } catch (error) {
    return res.status(500);
  }
}

const eliminarCategoria = async (req, res) => {
  const { id, nombre, imagen } = req.body
  try {
    resultado = await categoryService.deleteCategory(id, nombre, imagen);
    console.log("Categoria eliminada con exito [CONTROLLER]");
    res.status(200).json(resultado);
  } catch (error) {
    return res.status(500);
  }
}

module.exports = { consultarCategorias, crearCategoria, actualizarCategoria, eliminarCategoria}