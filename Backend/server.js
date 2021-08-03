const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./db/conexion');

//Rutas
const mlRoute = require('./routes/ml.routes');
const productRoute = require('./routes/productos.routes');
const categoryRoute = require('./routes/categorias.routes');
const clientesRoutes = require('./routes/clientes.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const ordenesRoutes = require('./routes/ordenes.routes')
//configuración de middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//levantamiento del servidor
async function initServer(){
  try {
    await sequelize.authenticate();
    console.log('Conección estabilizada correctamente');
    app.listen(process.env.PORT, function () {
        console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`);
    });    
  } catch (error) {
    console.error('No se pudo conectar correctamente con la Base de datos:', error);
  }
}

initServer();
mlRoute(app);
categoryRoute(app);
productRoute(app);
clientesRoutes(app);
pedidosRoutes(app);
ordenesRoutes(app);