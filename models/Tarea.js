const {Schema, model} = require('mongoose');

const TareaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto'
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    estado: {
        type: Boolean,
        default: false,
    }
});

module.exports = model('Tarea', TareaSchema);