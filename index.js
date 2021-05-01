require('dotenv').config() // import config that server can read file from .env
const express = require('express') // import Express

const sequelize = require ('./db') // import object from db.js

const models = require('./models/models') // import models from models.js

const cors = require('express-fileUpload') // import cors function to send requests from browser

const fileUpload = require('cors') // import filUpload function to upload files

const PORT = process.env.PORT || 5000 // <-- import port from .env file, if don't declare the port, set it to 5000 by default

const app = express() // create object to run express function

const router = require('./routes/index') // import Basic Router

const errorHandler = require('./middleWare/ErrorHandlingMidleware') // impoert middleware




app.use(cors()) // give app cors function
app.use(express.json()) // that app can parse json
app.use(fileUpload({})) // declare fileUpload with emtpy object parameter

app.use('/api', router) // 1 parameter URL, 2 parameter Basic router

app.use(errorHandler) // middleware hwich working with errors, must be declare in the last





/* make get request to test server response */
app.get('/', (req, res) => { // <-- 1 parameter: '/' = URL, 2 parameter: callback which has 2 parammeters request & response
    res.status(200).json({message: "WORKING!!!"}) // <-- server response: 200 =  status code, message = body
})


const start = async () => {
    try {
        await sequelize.authenticate() // to connect DB
        await sequelize.sync() // to sync DB
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) // first parameter: which port have to liste our server. second parameter callback, which runs after server started successfully  
    } catch (e) {
        console.log(e)
    }
}

start() // run start function to run server