const {Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model('Usuario', UsuarioSchema);