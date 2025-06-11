import { validationResult } from "express-validator";


const validateRegistroSchema = (req, res, next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: errors.array()
        })
    }
    next();
}


export default validateRegistroSchema;