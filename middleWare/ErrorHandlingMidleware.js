/* place between client's request and server function. until request arrives to servers's function it will pass middleware to check. middleware can will be several */

const ApiError = require('../error/ApiError') // export ApiError

module.exports = function(err, req, res, next) { // this is middleware, it receive: Error, Request, Response and Funtion Next, after it runs next chain of middleware takes action
    if (err instanceof ApiError){// if ApiError has err. The instanceof operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object. The return value is a boolean value. 
        return res.status(err.status).json({message: err.message}) // we return to client response with statuse code which we reseive from err and message from err.
    } 
    return res.status(500).json({message: "unexpected error"} ) // if err not instace of ApiError
}