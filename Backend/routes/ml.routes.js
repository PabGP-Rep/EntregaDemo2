const MercadoLibre = require('../Services/ml.service');
let mlService = new MercadoLibre();

const { limiter, validacionDatos} = require('../Midleware/index');

module.exports = (app) => {
  //EntryPoint
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Hola mundo desde API'
    }) 
  })

  //Solicitud de Categorias
  app.get('/categorias', async (req, res) => {
    try {
      const categories = await mlService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  })

  //Solicitud de Paises
  app.get('/paises', async (req, res) => {
    try {
      const countries = await mlService.getCountries();
      res.status(200).json(countries);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  })

  //Solicitud de Productos por Categoria
  app.post('/productos_categoria', async (req, res) => {
    try {
      //console.log(req.body);
      const productos = await mlService.getProductsCategory(req.body);
      res.status(200).json(productos);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  })

  //Solicitud de Productos por Nombre
  app.post('/productos_nombre', validacionDatos, async (req, res) => {
    try {
      //console.log(req.body);
      const productos = await mlService.getProductsName(req.body);
      res.status(200).json(productos);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  })

  app.use((err, req, res, next) => {
    if (err) {
      if (!res.headersSent) {
        return res.status(500).json('error interno del servidor');
      }
    }
    next();
  })
  
}
