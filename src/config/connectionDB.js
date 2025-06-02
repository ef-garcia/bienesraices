import db from './db.js';

const connectionDB = async () => {
    try {
        await db.authenticate();
        console.log('Conexion correcta a la Base de Datos');
    } catch (error) {
        console.error('Error al conectar la Base de Datos', error.message)
    }
}

export default connectionDB;