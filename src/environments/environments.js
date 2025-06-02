const environments = {
    PORT: process.env.PORT,
    DB: {
        PORT: process.env.DB_PORT,
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        NAME: process.env.DB_NAME,
        DIALECT: process.env.DB_DIALECT
    }
}

export default environments;