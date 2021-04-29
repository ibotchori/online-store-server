/* Basic Router - This merges all routes */

const Router = require('express')  // get router from exspress

const router = new Router() // create object from this Router


/*  import routes  */

const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')


/*  child routes  */

router.use('/user', userRouter) 
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)






module.exports = router  // export this router
