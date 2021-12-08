const router = require('express').Router();
const auth = require('../middleware/auth');
const {check}= require('express-validator');
const { 
    crearTarea, 
    obtenerTareas, 
    actualizarTarea,
    eliminarTarea 
} = require('../contollers/tareaController');
// api de tareas
// /api/tareas
router
.post('/', auth, 
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
], 
    crearTarea)
.get('/', auth, obtenerTareas)
.put('/:id', auth, actualizarTarea)
.delete('/:id', auth, eliminarTarea)
module.exports = router;