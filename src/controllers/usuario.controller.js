import { check, validationResult } from 'express-validator'
import Usuario from '../models/usuario.model.js';


const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesion'
    })
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    })
}

const registrar = async (req, res) => {
    
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
    
    // Verificar que el resultado este vacio, para que no cargue a la base de datos
    if( !resultado.isEmpty() ) {
        // errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            } 
        })
    }


    // Extraer los datos
    const { nombre, email, password } = req.body;


    // Verificar que el usuario (email) no este duplicado
    const existeUsuario = await Usuario.findOne({ where: { email } });
    if( existeUsuario ) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: [{ msg: 'El correo ya existe.' }],
            usuario: {
                nombre,
                email
            }
        })
    }


    console.log(existeUsuario);

    return;

    
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/recuperar-cuenta', {
        pagina: 'Recupera tu Cuenta'
    })
}


export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword,
}