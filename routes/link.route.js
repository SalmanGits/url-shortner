const express = require('express')
const router = express.Router()
const verifyToken = require('../auth/auth.js')
const { createLink, getLink, editLink, deleteLink } = require("../controllers/link.controllers.js")

router.post("/create", verifyToken, createLink)
router.post("/get", verifyToken, getLink)
router.put("/edit", verifyToken, editLink)

router.delete("/delete/:linkId", verifyToken, deleteLink)



module.exports = router