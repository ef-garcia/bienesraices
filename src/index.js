import express from 'express';
import usuarioRoutes from './routes/usuario.routes.js';


const server = express();

server.use('/', usuarioRoutes);

const port = 3000;


server.listen(port, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${port}`)
})