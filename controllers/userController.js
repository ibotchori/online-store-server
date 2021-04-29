/* Controller for user router */

class UserController { // create Class to group all this functions

    async registarion(req, res) { // function to user registration

    }
    async login(req, res) { // function to user login
       
    }
    async check(req, res) { //  function to check user authorization
        res.json('user')
        
    }
}

module.exports = new UserController() // export object (with functions) from this Class