/* Controller for brand router */

const {Brand} = require('../models/models') // import brand model
const ApiError = require('../error/ApiError') // import ApiError

class BrandController { // create Class to group all this functions

    async create(req, res) { // function to create brand
        const {name} = req.body // get brands's name from  request body (POST request)
        const brand = await Brand.create({name}) // create this brand 
        return res.json(brand) // return brand to client
    }
    async getAll(req, res) { // function to get all brands
        const brands = await Brand.findAll() // it give us all brands from database
        return res.json(brands) // return all masive from this object to client
    }
   
}

module.exports = new BrandController() // export object (with functions) from this Class