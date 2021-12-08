const Usuario = require("../models/Usuario");
const bcryp = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res, next) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errores: errors.array()});
    }
    
    // extraer email y password
    const {email, password} = req.body;

    try {
        // revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});
        if (usuario) {
            return res.status(400).json({msg: 'Este correo ya esta en uso'});
        }
        
        // crear el nuevo usuario
        usuario = new Usuario(req.body);
        // crear salt 
        const salt = await bcryp.genSalt(10);
        // hashear el password
        usuario.password = await bcryp.hash(password, salt);
        // guardar usuario
        // console.log(usuario);
        await usuario.save();
        // crear y firmar el JWT
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
            // mensaje de confirmacion
            res.json({token})
        });
    } catch (e) {
        console.log(e);
        res.status(400).send('Hubo un error');
    }
}