const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME, // import DB name parameter from .env file
    process.env.DB_USER, // User
    process.env.DB_PASSWORD, // Password
    {
        dialect: 'postgres', 
        host: process.env.DB_HOST, // Host
        port: process.env.DB_PORT, // Port
    }
) 