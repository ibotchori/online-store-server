const Router = require('express')  // get router from exspress

const router = new Router() // create object from this Router

const typeController = require('../controllers/typeController') // import type controller



router.post('/', typeController.create) // to create brand, second parameter object with specific function from user controller
router.get('/',typeController.getAll) // to get all brands, second parameter object with specific function from user controller






module.exports = router  // export this router
