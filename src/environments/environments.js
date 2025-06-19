
import dotenv from 'dotenv';
dotenv.config();

const environments = {
    PORT: process.env.PORT,
    DB: {
        PORT: process.env.DB_PORT,
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        NAME: process.env.DB_NAME,
        DIALECT: process.env.DB_DIALECT
    },
    EMAIL: {
        HOST: process.env.EMAIL_HOST,
        PORT: process.env.EMAIL_PORT,
        USER: process.env.EMAIL_USER,
        PASS: process.env.EMAIL_PASS
    },
    BACKEND_URL: process.env.BACKEND_URL
}

export default environments;