// rutas para crear usuarios
const router = require('express').Router();
const { crearUsuario } = require('../contollers/usuarioController');
const {check} = require('express-validator');
// crea un usuario
// api/usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres y menor a 50 caracteres').isLength({min: 6, max: 40})
    ],
    crearUsuario);

module.exports = router;