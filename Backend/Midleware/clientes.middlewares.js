const Clientedb = require("../models/clientes.modelo");
const jois = require('../DTO/clientesdto');
const Joi = require('joi');
const { descubrirToken } = require('../Services/jwt.service');

const clienteUsuarioEnviado = function (req,res,next) {
    try {
        Joi.attempt({USERNAME: req.body.USERNAME,PASSWORD_USUARIO: req.body.PASSWORD_USUARIO},jois.usuario_contrasena_schema,'Falta usuario y contraseña')
        return next()
    } catch (error) {
        console.log(error.message);
        return res.status(400).json('Falta usuario y/o contraseña')
    }
}

const checarCliente= async function (req,res,next) {
    let listaClientes = await Clientedb.findAll(
        {where: {USERNAME:req.body.USERNAME}}
    );
    if(listaClientes.length ===0){
        return res.status(400).json('No existe el usuario');
    }else if(listaClientes[0].PASSWORD_USUARIO !== req.body.PASSWORD_USUARIO){
        return res.status(400).json('Contraseña incorrecta')
    }
    return next();
}

const clienteDatosEnviados = function(req,res,next) {
    try {
        Joi.attempt(req.body, jois.usuario_completo, 'Falta algun dato');
        return next()
    } catch (error) {
        console.log(error.message);
        return res.status(400).json('Falta algun dato')
    }
}

const clienteExiste = async function(req,res,next) {
    let listaClientes = await Clientedb.findAll(
        {where: {USERNAME: req.body.USERNAME}}
    );
    if(listaClientes.length > 0) {
        return res.status(400).json('Usuario ya registrado')
    }
    return next();
}


const puedeVerInfo = async function(req,res,next) {
    let listaClientes = await Clientedb.findAll(
        {where: {USERNAME: req.body.USERNAME}}
    );
    if (listaClientes[0].PAPEL !== 'ADMIN') {
        return res.status(403).json('Usuario no autorizado a ver esto')
    }
    return next();
}

const validarToken = async (req, res, next) => {
  try {
    console.log("Recibi:");
    console.log(req.headers);
    
    if (req.headers.authorization != undefined) {
      const token = req.headers.authorization.split(' ')[1];
      const verified = await descubrirToken(token);
      if (verified.data.ROLE == 'ADMIN'){
        console.log("token verificado:");
        console.log(verified);
        return next ();
      } 
      else{
        return res.status(403).json('NESECITAS PERMISO DE ADMINISTRADOR')
      }
    }
    else{
      return res.status(403).json('INVALID AUTHORIZATION');
    }
    
  } catch (error) {    
    console.log(error);    
  }
}

module.exports = {clienteUsuarioEnviado,checarCliente, clienteExiste,clienteDatosEnviados,puedeVerInfo, validarToken}