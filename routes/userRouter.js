const Router = require('express')  // get router from exspress

const router = new Router() // create object from this Router

const userController = require('../controllers/userController') // import user controller





router.post('/registration', userController.registration) // route to user registration, second parameter object with specific function from user controller
router.post('/login', userController.login) // route to user uthorization, second parameter object with specific function from user controller
router.get('/auth', userController.check) // route to check user authorization, second parameter object with specific function from user controller






module.exports = router  // export this router