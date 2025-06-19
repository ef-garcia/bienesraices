import express from 'express';
import dotenv from 'dotenv';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuario.routes.js';
import connectionDB from './config/connectionDB.js';
import env from './environments/environments.js'

// Crear server
const server = express();

// Dotenv
dotenv.config();

// Habilitar lectura de datos de formularios
server.use( express.urlencoded({ extends: true }));


//Habilitar Cookie Parser
server.use( cookieParser() );

// Habilitar CSRF
server.use( csrf({ cookie: true }) );

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
});