const {connect} = require('mongoose');
require('dotenv').config();

const conectarDb = async _ => {
    try {
        await connect(process.env.MONGO_URI, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
            });
        console.log('conectado Mongo Atlas'.blue);
    } catch (e) {
        console.log(`${e}`.red);
        process.exit(1);//detener la app
    }
}

module.exports = conectarDb;