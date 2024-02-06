
const sendResponse = require("../helpers/sendResponse")


const createLink = async (req, res, next) => {
    try {

        sendResponse(res, { status: 201, message: "book created", success: true })
    } catch (error) {
        next(error)

    }
}





module.exports = {
createLink
}