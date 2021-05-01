/* Controller for device router */

const uuid = require('uuid') // import uuid form uniq ID

const path = require('path') // import path module, from node.js

const {Device} = require('../models/models') // import device model

const ApiError = require('../error/ApiError') // import ApiError



class DeviceController { // create Class to group all this functions

    async create(req, res, next) { // function to create device
        try {
            const {name, price, brandId, typeId, info} = req.body //  get data from request body (POST request)
            const {img} = req.files // get image from request's files field
            let fileName = uuid.v4() + ".jpg" // to generate uniq name for file (img). because, the we can take this file under this uniq name 
            img.mv(path.resolve(__dirname, '..', 'static', fileName )) // move this file to static folder. parameters: __dirname = this folder, .. = move to up, static = move to static folder, filename = nane of this file
    
            const device = await Device.create({name, price, brandId, typeId, img: fileName}) // create device, with all necessary parameters
    
            return res.json(device) // return device to client
        } catch (e) {
            next(ApiError.badRequest(e.message))            
        }
     

    }
    async getAll(req, res) { // function to get all devices
        
    }
    async getOne(req, res) { // function to get one device
        
    }
   
}

module.exports = new DeviceController() // export object (with functions) from this Class