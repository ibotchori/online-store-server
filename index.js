require('dotenv').config() // import config that server can read file from .env
const express = require('express') // import Express

const sequelize = require ('./db') // import object from db.js

const PORT = process.env.PORT || 5000 // <-- import port from .env file, if don't declare the port, set it to 5000 by default

const app = express() // create object to run express function


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