import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'

// Conectar a bd

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.magenta('Coneccion exitosa a DB'))
    } catch(error) {
        console.log(error)
        console.log(colors.red.white('Hubo un error'))
    }
}
connectDB()

const server = express()

//Leer datos de Formulario
server.use(express.json())
server.use('/api/products', router)

export default server