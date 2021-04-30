class ApiError extends Error {
    constructor(status, message) { // 1 par: statuse code, 2 par: message whit returs to client
        super()
        this.status = status
        this.message = message

    }

    /* Static functions which can call without create the object */

    static badRequest(message) {
        return new ApiError(484, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }

    
}

module.exports = ApiError // export this class