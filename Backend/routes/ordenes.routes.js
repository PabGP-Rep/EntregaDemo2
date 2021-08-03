const {HacerNuevaOrden,Ordenmaxima} = require("../controller/ordenes.controlador");

module.exports = (app) => {
    app.post('/ordenes/nueva',HacerNuevaOrden);

    app.get('/ordenes/maxima',Ordenmaxima)
}