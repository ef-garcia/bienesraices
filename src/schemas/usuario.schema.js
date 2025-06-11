import { body } from "express-validator";


const usuarioSchema = [
    body("nombre")
        .exists().withMessage("El nombre es requerido")
        .isString().withMessage("El nombre debe ser un string")
        .isLength({ min: 4 }).withMessage("El nombre debe tener al menos 3 caracteres"),
    body("email")
        .exists().withMessage("El email es requerido")
        .isEmail().withMessage("Debe ser un email"),
    body("password")
        .exists().withMessage("La contraseña es requerida")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("repetir_password")
        .equals("password").withMessage("La contraseñas no son iguales")
    
]


export default usuarioSchema





