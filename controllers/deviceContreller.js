/* Controller for device router */

const uuid = require('uuid') // import uuid form uniq ID

const path = require('path') // import path module, from node.js

const {Device, DeviceInfo} = require('../models/models') // import device and deviceinfo model

const ApiError = require('../error/ApiError') // import ApiError



class DeviceController { // create Class to group all this functions

    async create(req, res, next) { // function to create device
        try {
            let {name, price, brandId, typeId, info} = req.body //  get data from request body (POST request)
            const {img} = req.files // get image from request's files field
            let fileName = uuid.v4() + ".jpg" // to generate uniq name for file (img). because, the we can take this file under this uniq name 
            img.mv(path.resolve(__dirname, '..', 'static', fileName )) // move this file to static folder. parameters: __dirname = this folder, .. = move to up, static = move to static folder, filename = nane of this file
            
            const device = await Device.create({name, price, brandId, typeId, img: fileName}) // create device, with all necessary parameters


            if (info) { //if info is request body
                info = JSON.parse(info) // parse info to JSON
                info.forEeach(i =>
                    DeviceInfo.create({ // call create function for all elements of info array
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            
    
            return res.json(device) // return device to client
        } catch (e) {
            next(ApiError.badRequest(e.message))            
        }
     

    }
    async getAll(req, res) { // function to get all devices
        let {brandId, typeId, limit, page} = req.query // get brandId and typeId from query, add 2 parameters: limit = number of device which is appeared on page. page = current page
        page = page || 1 // if page do not set, make it 1 by default
        limit = limit || 9 // if limit do not set, make it 9 by default. 9 devices in one page
        let offset = page * limit - limit
        let devices;
        if(!brandId && !typeId) { // if they do not set
            devices = await Device.findAndCountAll({limit, offset}) // return all devices, add limit and offse to parameters, change findAll to findAndCountAll to know all items count (frontEnd use it)
        }
        if(brandId && !typeId) { // if only brandid is set
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset}) // filter and return brandid, add limit and offse to parameters, change findAll to findAndCountAll to know all items count (frontEnd use it)
        }
        if(!brandId && typeId) { // if only typeId is set
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset}) // filter and return typeId, add limit and offse to parameters, change findAll to findAndCountAll to know all items count (frontEnd use it)
        }
        if(brandId && typeId) { // if they set both
            devices = await Device.findAndCountAll({where: {typeId}, brandId, limit, offset}) // return devices when both brandId && typeId must be match, add limit and offse to parameters, change findAll to findAndCountAll to know all items count (frontEnd use it)
        }

        return res.json(devices) // return all masive of this devices to client
        
    }
    async getOne(req, res) { // function to get one device
        const {id} = req.params // get device id (from routes/deviceRouter.js)
        const device = await Device.findOne( // call findOne function, to get one device
            {  // condition by which we will find this device
                where: {id},
                include:[{model: DeviceInfo, as: 'info'}]
            }
        )
        return res.json(device) // retun device to client
    }
   
}

module.exports = new DeviceController() // export object (with functions) from this Class