const Router = require('express')  // get router from exspress

const router = new Router() // create object from this Router

const deviceController = require('../controllers/deviceContreller') // import device controller



router.post('/', deviceController.create) // to create device, second parameter object with specific function from user controller
router.get('/', deviceController.getAll) // to get all device, second parameter object with specific function from user controller
router.get('/:id', deviceController.getOne) // to get one device, second parameter object with specific function from user controller






module.exports = router  // export this router
