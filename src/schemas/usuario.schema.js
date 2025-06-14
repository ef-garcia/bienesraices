// import { body } from "express-validator";
import { check, validationResult } from 'express-validator'


// const usuarioSchema = [
//     body("nombre")
//         .exists().withMessage("El nombre es requerido")
//         .isString().withMessage("El nombre debe ser un string")
//         .isLength({ min: 4 }).withMessage("El nombre debe tener al menos 3 caracteres"),
//     body("email")
//         .exists().withMessage("El email es requerido")
//         .isEmail().withMessage("Debe ser un email"),
//     body("password")
//         .exists().withMessage("La contraseña es requerida")
//         .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
//     body("repetir_password")
//         .equals("password").withMessage("La contraseñas no son iguales")
// ]

const usuarioSchema = async(req, res) =>  {

    const contrasenia = req.body.password; // variable de contraseña

    // Validaciones del formulario de registro
    await check('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 4 }).withMessage('El nombre debe tener mas de 3 caracteres')
        .run(req)
    await check('email')
        .isEmail().withMessage('El email es obligatorio')
        .run(req)
    await check('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener minimo 6 caracteres')
        .run(req)
    await check('repetir_password')
        .equals(contrasenia).withMessage('Las contraseñas no son iguales')
        .run(req)

    let resultado = validationResult(req)
    res.json(resultado.array())
}


export default usuarioSchema





