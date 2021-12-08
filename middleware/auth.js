const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // leer el token del header
    const token = req.header('x-auth-token');
    // revisar si no hay token
    if (!token) {
        return res.status(401).json({msg: 'No tiene Permiso para este tipo de acciones'})
    }
    // validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        // console.log(cifrado);
        req.usuario = cifrado.usuario;
        next()
    } catch (e) {
        res.status(401).json({msg: 'Token no valido'})
    }
}