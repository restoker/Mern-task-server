const Usuario = require("../models/Usuario");
const bcryp = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errores: errors.array()});
    }
    // extarer el email y el password
    const {email, password} = req.body;

    try {
        // revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'});
        }
        // revisar el password del usuario
        const passCorrecto = await bcryp.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({msg: 'El password es incorrecto'});
        }
        // si todo es correcto, TODO: crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        // firmar el jwtoken
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: "7d"
        }, (error, token)  => {
            if(error) throw error;
            // mensaje de confirmacion
            res.json({token})
        });

    } catch (e) {
        console.log(e);
    }
}
// obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario})
    } catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Hubo un error'})
    }
}