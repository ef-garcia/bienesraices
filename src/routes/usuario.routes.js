import express from 'express';
import { 
    formularioLogin, 
    formularioRegistro,
    registrar,
    formularioOlvidePassword 
} from '../controllers/usuario.controller.js';

const router = express.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.get('/recuperar-cuenta', formularioOlvidePassword);



export default router