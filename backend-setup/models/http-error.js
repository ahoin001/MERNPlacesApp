// Extends Error so it can access its propertoes
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message); // Add a message property

        // Dev supplies error code
        this.code = errorCode
    }

}

module.exports = HttpError