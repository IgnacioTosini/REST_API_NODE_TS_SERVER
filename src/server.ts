import express from 'express'
import colors from 'colors'
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

server.get('/api', (req, res) => {
    res.json({ msg: 'Desde json' })
})

export default server