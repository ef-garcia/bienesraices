import { check, validationResult } from 'express-validator'
import Usuario from '../models/usuario.model.js';
import { generarId } from '../helpers/tokens.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js';


const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesion'
    })
}

const formularioRegistro = (req, res) => {    
    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken()
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

    let resultado = validationResult(req);
    
    // Verificar que el resultado este vacio, para que no cargue a la base de datos
    if( !resultado.isEmpty() ) {
        // errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
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
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El correo ya existe.' }],
            usuario: {
                nombre,
                email
            }
        })
    }

    // Almacenar un Usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    });

    // Envia email de confirmacion
    emailRegistro({
        nombre: usuario.nombre, 
        email: usuario.email,
        token: usuario.token
    })


    // Mostrar mensaje de confirmacion
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos enviado un email de confirmación, presiona en el enlace.'
    })
    
}

// Funcion que confirma el email, comprueba la cuenta
const confirmar = async (req, res) => {
    const { token } = req.params;

    // Verificar si el token es valido
    const usuario = await Usuario.findOne({ where: { token } });

    if( !usuario ) {
        return res.render("auth/confirmar-cuenta", {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        })
    }

    // Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    res.render("auth/confirmar-cuenta", {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmo correctamente',
        error: false
    })

}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/recuperar-cuenta', {
        pagina: 'Recupera tu Cuenta',
        csrfToken: req.csrfToken(),
    })
}

const resetPassword = async (req, res) => {
    // Validacion
    await check('email')
        .isEmail().withMessage('El email es obligatorio')
        .run(req)
    
    let resultado = validationResult( req );

    // Verificar que el resultado este vacio
    if( !resultado.isEmpty() ) {
        return res.render('auth/recuperar-cuenta', {
            pagina: 'Recupera tu Cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }

    // Buscar el usuario
    const { email } = req.body;

    const usuario = await Usuario.findOne({ where: { email }});
    
    if( !usuario ) {
        return res.render('auth/recuperar-cuenta', {
            pagina: 'Recupera tu cuenta',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El email no pertenece a ningun usuario' }]
        })
    }

    // Generar un token y enviar el email
    usuario.token = generarId();
    await usuario.save();

    // Enviar un email
    emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    })

    // Renderizar un mensaje
    res.render('templates/mensaje', {
        pagina: 'Restablece tu contraseña',
        mensaje: 'Hemos enviado un email con las instrucciones'
    })

}

const comprobarToken = (req, res, next) => {
    next()
}

const nuevoPassword = (req, res) => {

}

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
    comprobarToken,
    nuevoPassword
}