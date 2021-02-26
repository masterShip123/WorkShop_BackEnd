const express = require('express')
const cors = require('cors')
const app = express()

const corsOptions = {
    origin: ['http://example.com', 'http://localhost:4200'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


//middle ware
app.use(cors(corsOptions)) //All
app.use(express.json()) // อนุญ่าติรับพารามิเตอ JSon
app.use(express.urlencoded({ extended: false }))
app.use(require('./controller'))


//Run Port Server
const PORT = process.env.PORT || 1150
app.listen(PORT, () => {
    const env = `${process.env.NODE_ENV || 'development'}`
    console.log(`App listenning on port ${PORT}`)
    console.log(`App listenning on env ${env}`)
    console.log(`Press Ctrl+c to quit fffgg`)
}) 