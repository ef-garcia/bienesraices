import express from 'express';
import usuarioSchema from '../schemas/usuario.schema.js';
import validateRegistroSchema from '../middleware/validationSchema.js';
import { 
    formularioLogin, 
    formularioRegistro,
    registrar,
    formularioOlvidePassword 
} from '../controllers/usuario.controller.js';

const router = express.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', usuarioSchema, validateRegistroSchema, registrar);

router.get('/recuperar-cuenta', formularioOlvidePassword);



export default router