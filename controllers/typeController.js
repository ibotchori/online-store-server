/* Controller for type router */

const {Type} = require('../models/models') // import type model
const ApiError = require('../error/ApiError') // import ApiError

class TypeController { // create Class to group all this functions

    async create(req, res) { // function to create type
        const {name} = req.body // get type's name from  request body (POST request)
        const type = await Type.create({name}) // create this Type 
        return res.json(type) // return type to client

    }
    async getAll(req, res) { // function to get all types
        const types = await Type.findAll() // it give us all types from database
        return res.json(types) // return all masive from this object to client

    }
   
}

module.exports = new TypeController() // export object (with functions) from this Class