import express from 'express';
import usuarioRoutes from './routes/usuario.routes.js';


const server = express();

server.set('view engine', 'pug');
server.set('views', './src/views');

server.use(express.static('src/public'));

server.use('/auth', usuarioRoutes);


const port = 3000;
server.listen(port, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${port}`)
})