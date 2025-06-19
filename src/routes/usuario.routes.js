import express from 'express';
import { 
    formularioLogin, 
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
    comprobarToken,
    nuevoPassword

} from '../controllers/usuario.controller.js';

const router = express.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar)

router.get('/recuperar-cuenta', formularioOlvidePassword);
router.post('/recuperar-cuenta', resetPassword);

// Almacena el nuevo password
router.get('/recuperar-cuenta/:token', comprobarToken);
router.post('/recuperar-cuenta/:token', nuevoPassword);

export default router