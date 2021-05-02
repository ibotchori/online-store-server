/* Controller for user router */

const ApiError = require('../error/ApiError') // import ApiError

const bcrypt = require('bcrypt') // import bcrypt to password hashing

const jwt = require('jsonwebtoken') // import JSON web token

const {User, Basket} = require('../models/models') // import User and Basket models


const generateJwt = (id, email, role) => { // generate JSON web token
        return jwt.sign(  
            {id, email, role}, // 1 parameter: payload (user's data)
            process.env.SECRET_KEY, // 2 parameter: secret key from .env file
            {expiresIn: '24h'} // 3 parameter: how long token will live
        )
}


class UserController { // create Class to group all this functions

    async registarion(req, res, next) { // function to user registration
        const {email, password, role} = req.body // get data from request body. Role uses tu create separately Administrator and separately User
        if(!email || !password){ //if email and password is empty
            return next(ApiError.badRequest('Incorrect Email or Password')) // return error to client
        }

        /* Check user, if user arledy exist, return error to client */
        const candidate = await User.findOne({where: {email}})
        if(candidate) {
            return next(ApiError.badRequest('User with such email already exist'))
        }

        /* create user */
        const hashPassword = await bcrypt.hash(password, 5 ) // hash user's password, 5 times
        const user = await User.create({email, role, password: hashPassword}) // create user with parameters (with hashed password)
        const basket = await Basket.create({userId: user.id}) // create Basket
        const token = generateJwt(user.id, user.email, user.role) // call generateJwt function
        return res.json({token}) // return token to client
    }


    async login(req, res, next) { // function to user login
        const {email, password} = req.body // get user data from request body

        /* Check user if it is in the database */
        const user = await User.findOne({where:{email}})

        if(!user) { // return error if user is not found
            return next(ApiError.internal('User is not found'))
        }

        /* check user's password if it match the password in the database */
        let compapePassword = bcrypt.compareSync(password, user.password) // first we must to unhash password from databaze with compareSync. 1 parameter: password written by user in form. 2 parameter: password from database
        
        if(!compapePassword) { // if password do not match
            return next(ApiError.internal('Invalid password')) // return error to client
        }

        /* generete token and return */
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
       
    }
    async check(req, res, next) { //  function to check user authorization
   
        
    }
}

module.exports = new UserController() // export object (with functions) from this Class