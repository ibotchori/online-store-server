/* check user role */

const jwt = require('jsonwebtoken') // import JSON web token

module.exports = function(role) { // export this function with user's role parameter, we call this function with role and it retur to us middlaware
    return function (req, res, next) { 
        if(req.method === "OPTIONS") { // if HTTP method = OPTIONS, move on to the next step
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // get token from header. Header: [token type (in our case: Bearer), token]
            if(!token) { // If there is no token send error to client
                return res.status(401).json({message: "Not authorized"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY) // decode token. 1 par: token. 2 par: secret key
            if(decoded.role !== role ) { // get user's role from decoded token, and compare it with role we send in middleware
                return res.status(403).json({message: "You have no access"}) // if they do not match, send error to clinet
            }
            req.user = decoded // add token to request's user field
            next()
            
        } catch (e) { //in case error send it to client
            res.status(401).json({message: "Not authorized"})
        }
    }
}