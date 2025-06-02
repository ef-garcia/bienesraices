import express from 'express';
import usuarioRoutes from './routes/usuario.routes.js';
import db from './config/db.js';

// Crear server
const server = express();

// Conexion a la base de datos
try {
    await db.authenticate();
    console.log('Conexion correcta a la Base de Datos')
} catch (error) {
    console.log(error)
}

// Habilitar Pug
server.set('view engine', 'pug');
server.set('views', './src/views');

// Carpeta Publica
server.use(express.static('src/public'));

// Routing
server.use('/auth', usuarioRoutes);

// Definir puerto y arrancar el proyecto1
const port = 3000;
server.listen(port, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${port}`)
})