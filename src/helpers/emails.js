import nodemailer from 'nodemailer';
import env from "../environments/environments.js";


const emailRegistro = async (datos) => {

    const transport = nodemailer.createTransport({
        host: env.EMAIL.HOST,
        port: env.EMAIL.PORT,
        auth: {
            user: env.EMAIL.USER,
            pass: env.EMAIL.PASS
        }
    });

    const { email, nombre, token } = datos;

    // Enviar el email
    await transport.sendMail({
        from: 'bienesraices.com',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaices.com',
        text: 'Confirma tu cuenta en BienesRaices.com',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en bienesraices.com. </p>

            <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
            <a href="${env.BACKEND_URL}:${env.PORT}/auth/confirmar/${token}">Confirmar cuenta</a></p>
            
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje.</p>
        `
    })
    

}



export {
    emailRegistro
}