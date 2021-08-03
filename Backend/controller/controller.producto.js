const Product = require('../Services/producto.service');

const productService = new Product();

const crearProducto = async (req, res) => {
  const { idCategoria, nombre, precio, imagen } = req.body
  try {
    const producto = await productService.createProduct(idCategoria, nombre, precio, imagen);
    console.log("Producto creado con exito [CONTROLLER]");  
    res.status(201).json(producto);
  } catch (error) {
    return res.status(500);
  }
}

const consultarProductos = async (req, res) => {
  try {
    const productos = await productService.readProduct();
    console.log("Consulta realizada con exito [CONTROLLER]");
    res.status(200).json(productos);
  } catch (error) {
    return res.status(500);
  }
}

const actualizarProducto = async (req, res) => {
  const { id, idCategoria, nombre, precio, imagen } = req.body
  try {
    resultado = await productService.updateProduct(id, idCategoria, nombre, precio, imagen);
    console.log("Producto actualizado con exito [CONTROLLER]");
    res.status(200).json(resultado);
  } catch (error) {
    return res.status(500);
  }
}

const eliminarProducto = async (req, res) => {
  const { id, idCategoria, nombre, precio, imagen } = req.body
  try {
    resultado = await productService.deleteProduct(id, idCategoria, nombre, precio, imagen);
    console.log("Producto eliminado con exito [CONTROLLER]");
    res.status(200).json(resultado);
  } catch (error) {
    return res.status(500);
  }
}

module.exports = { crearProducto, consultarProductos, actualizarProducto, eliminarProducto }