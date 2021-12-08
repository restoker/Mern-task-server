const app = require('express')();
const conectarDb = require('./config/db');
const usuarios = require('./routes/usuario');
const auth = require('./routes/auth');
const proyectos = require('./routes/proyectos');
const tareas = require('./routes/tareas');
require('colors');
const cors = require('cors');
// puerto de la app
const port = process.env.PORT || 4000;
// conectar a la base de datos
conectarDb();
// habilitar cors
app.use(cors());
// habilitar express.json
app.use(require('express').json({extended: true}));
// importar rutas
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);
app.use('/api/proyectos', proyectos);
app.use('/api/tareas', tareas);

// arrancar la aplicación
app.listen(port, _ => {
    console.log(`servidor trabajando en: http://localhost:${port}`.cyan);
})