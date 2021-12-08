// ruta para utenticar usuario
const router = require('express').Router();
const {check} = require('express-validator');
const { autenticarUsuario, usuarioAutenticado } = require('../contollers/authController');
const auth = require('../middleware/auth');
// iniciar sesion
// /api/auth
router.post('/',
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres y menor a 50 caracteres').isLength({min: 6, max: 40})
    ],
    autenticarUsuario
    ).get('/', auth, usuarioAutenticado)

module.exports = router;
