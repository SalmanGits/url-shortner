
const sendResponse = require("../helpers/sendResponse")
const { validateUrl } = require("../utils/checkUrl")
const Link = require("../models/link.model.js")
const ShortUniqueId = require("short-unique-id")
const uid = new ShortUniqueId();


const createLink = async (req, res, next) => {
    try {
        const { url } = req.body
        const { id } = req.user
        if (validateUrl(url)) {
            let exist = await Link.findOne({ url })
            if (exist) {
                return sendResponse(res, { status: 200, message: "url is already shortened", success: true, data: url })
            } else {
                let uniqueId = uid.rnd(10)
                let shortUrl = `${process.env.BASE}/${uniqueId}`
                let createdLink = await Link.create({
                    url,
                    shortUrl,
                    user: id,
                    urlId: uniqueId
                })
                return sendResponse(res, { status: 200, message: "url shortened", success: true, data: createdLink })
            }
        } else {
            return sendResponse(res, { status: 400, message: "invalid url", success: false })
        }

    } catch (error) {
        next(error)

    }
}

const getLink = async (req, res, next) => {
    try {
        const { isActive } = req.body
        const { id } = req.user
        const links = await Link.find({ isActive, user: id })
        if (links.length) {
            return sendResponse(res, { status: 200, message: "All Links", success: true, data: links })
        }
        else {
            return sendResponse(res, { status: 400, message: "No Links Found", success: false })
        }
    } catch (error) {
        next(error)
    }
}


const editLink = async (req, res, next) => {
    try {
        const { url, linkId } = req.body
        if (validateUrl(url)) {
            const existingLink = await Link.findById(linkId);
            if (!existingLink) {
                return sendResponse(res, { status: 404, message: "Link not found", success: false });
            }
            existingLink.url = url;
            await existingLink.save();

            return sendResponse(res, { status: 200, message: "Link updated successfully", success: true, data: existingLink });

        } else {
            return sendResponse(res, { status: 400, message: "Invalid URL", success: false });
        }
    } catch (error) {
        next(error)
    }
}


const incrementLink = async (req, res, next) => {
    try {
        const { urlId } = req.params
        console.log(urlId)
        const existingLink = await Link.findOne({ urlId });
        if (existingLink) {
            await Link.updateOne(
                {
                    urlId,
                },
                { $inc: { clicks: 1 } }
            );
            return res.redirect(existingLink.url);

        }
        else {
            return sendResponse(res, { status: 404, message: "Link not found", success: false });
        }
    } catch (error) {
        next(error)
    }
}



const deleteLink = async (req, res, nex) => {
    try {
        const { linkId } = req.params
        const updated = await Link.findByIdAndUpdate(linkId, { $set: { isActive: false } })
        if (updated) {
            return sendResponse(res, { status: 200, message: "Link deleted successfully", success: true })
        } else {
            return sendResponse(res, { status: 404, message: "Link not found", success: false });
        }
    } catch (error) {
        next(error)
    }
}




module.exports = {
    createLink,
    editLink,
    getLink,
    incrementLink,
    deleteLink
}