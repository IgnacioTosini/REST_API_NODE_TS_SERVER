import express from 'express'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router from './router'
import db from './config/db'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'

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

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}

server.use(morgan('dev'))
server.use(cors(corsOptions))

// Leer datos de Formulario
server.use(express.json())
server.use('/api/products', router)

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server