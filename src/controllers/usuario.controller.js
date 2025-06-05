


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

const registrar = (req, res) => {
    console.log('Registrando.....');
    
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