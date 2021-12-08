const Proyecto = require("../models/Proyecto")
const Tarea = require("../models/Tarea")
const {validationResult} = require('express-validator');
// crea una nueva tarea

exports.crearTarea = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errores: errors.array()});
    }
    // extraer el proyecto y comprobar si existe
    try {
        const {proyecto} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        // revisar si el proyecto actual pertenece al usuario autenticado
         if (existeProyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({msg: 'No autorizado'})
        }
        // crear la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});
    } catch (e) {
        console.log(e);
        res.status(500).send('Hubo un error');
    }
}

// obtener tareas por proyecto
exports.obtenerTareas = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errores: errors.array()});
    }

    try {
        const {proyecto} = req.query;
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        // revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({msg: 'No autorizado'})
        }
        // obtener las tareas por proyecto
        const tareas = await Tarea.find({proyecto}).sort({creado: "desc"});
        res.json({tareas});
    } catch (e) {
        console.log(e);
        res.status(500).send('Hubo un error');
    }
}

// actualizar la tarea seleccionada
exports.actualizarTarea = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errores: errors.array()});
    }
    try {
        // extraer el proyecto, estado y nuevo nombre
        const {proyecto, nombre, estado} = req.body;
        // verificar si la tarea existe
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({msg: 'Tarea no encontrada'});
        }
        const existeProyecto = await Proyecto.findById(proyecto);
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({msg: 'No autorizado'})
        }
        // crearun objeto con la nueva informacion
        const nuevaTarea = {};
        if (nombre) nuevaTarea.nombre = nombre;
        if (estado) nuevaTarea.estado = estado
        // guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});
        res.json({tarea})
    } catch (e) {
        console.log(e);
        res.status(500).send('Error en el servidor');
    }
}

// eliminar una tarea

exports.eliminarTarea = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errores: errors.array()});
    }
    try {
        // extraer el proyecto, estado y nuevo nombre
        const {proyecto} = req.query;
        // verificar si la tarea existe
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({msg: 'Tarea no encontrada'});
        }
        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        // revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({msg: 'No autorizado'})
        }
        // eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea elimminada'});
       
    } catch (e) {
        console.log(e);
        res.status(500).send('Error en el servidor');
    }
}