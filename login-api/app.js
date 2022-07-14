const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')

require('dotenv').config()

// MONGO DB
const connectDB = require("./config/db")
connectDB();

// Rutas
const usersRoutes = require('./routes/users')

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'WORKS'
//     })
// })

// Error con Morgan
// Nota: debe star al principio de las rutas
app.use(morgan('dev'))

// Para hacer la carpeta uploads publica
app.use('/uploads', express.static('uploads'))

// Del BodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Auth')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

// Routes
app.use('/user', usersRoutes)

// Para Morgan
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

//

module.exports = app 