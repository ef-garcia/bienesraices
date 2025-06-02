import { Sequelize } from "sequelize";
import env from "../environments/environments.js"

const { 
    HOST, 
    PORT, 
    USER, 
    PASSWORD, 
    NAME, 
    DIALECT } = env.DB

const db = new Sequelize(NAME, USER, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect: DIALECT
})

export default db