import express from 'express';
import usuarioRoutes from './routes/usuario.routes.js';
import connectionDB from './config/connectionDB.js';
import env from './environments/environments.js'

// Crear server
const server = express();

// Conexion a la base de datos
await connectionDB();

// Habilitar Pug
server.set('view engine', 'pug');
server.set('views', './src/views');

// Carpeta Publica
server.use(express.static('src/public'));

// Routing
server.use('/auth', usuarioRoutes);

// Definir puerto y arrancar el proyecto1
const port = env.PORT;
server.listen(port, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${port}`)
})