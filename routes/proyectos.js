const router = require('express').Router();
const { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto } = require('../contollers/ProyectoController');
const auth = require('../middleware/auth');
const {check}= require('express-validator');
// crea un proyectos
// api/proyectos
router.post('/', auth, [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()] ,crearProyecto)
      .get('/', auth, obtenerProyectos)
      .put('/:id', auth, [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],actualizarProyecto)
      .delete('/:id', auth, eliminarProyecto)

module.exports = router;