/* Controller for user router */

const ApiError = require('../error/ApiError') // import ApiError

class UserController { // create Class to group all this functions

    async registarion(req, res) { // function to user registration

    }
    async login(req, res) { // function to user login
       
    }
    async check(req, res, next) { //  function to check user authorization
        // test to check server response: res.json('user')
        const {id }= req.query
        if(!id){ // if client dot not set ID
         return   next(ApiError.badRequest("ID not set")) // call badRequest function from ApiError and set parameter to response client
        }
        res.json(id)

        
    }
}

module.exports = new UserController() // export object (with functions) from this Class