import nodemailer from 'nodemailer';

const emailRegistro = async (dato) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: precoess.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

}



export {
    emailRegistro
}