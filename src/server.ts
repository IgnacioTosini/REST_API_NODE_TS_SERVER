import express from 'express'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router from './router'
import db from './config/db'

// Conectar a bd
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.magenta('Conexión exitosa a DB'))
    } catch (error) {
        console.log(colors.red.white(`Hubo un error al conectar a la BD`))
    }
}
connectDB()

const server = express()

// Leer datos de Formulario
server.use(express.json())
server.use('/api/products', router)

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server