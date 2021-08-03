const joi = require('joi');

module.exports.usuario_contrasena_schema = joi.object().keys({
    USERNAME: joi.string().required(),
    PASSWORD_USUARIO: joi.string().required()
})

module.exports.usuario_completo = joi.object().keys({
    NOMBRE1: joi.string().alphanum().required(),
    NOMBRE2: joi.string().alphanum(),
    PAPEL: joi.string(),
    APELLIDO1: joi.string().alphanum().required(),
    APELLIDO2: joi.string().alphanum().required(),
    USERNAME: joi.string().required(),
    DIRECCION: joi.string().required(),
    ENVIOS: joi.string().required(),
    PAIS: joi.string().alphanum().required(),
    FORMA_PAGO: joi.string().required(),
    PROPIETARIO_TARJETA: joi.string().required(),
    NUM_TARJETA: joi.number().integer().required(),
    CADUCIDAD: joi.date().required(),
    PASSWORD_USUARIO: joi.string().min(10).alphanum().required(),
    CVV: joi.string().alphanum().required(),
    MAIL: joi.string().email().required(),
    TELEFONO: joi.string().alphanum().required()
})


