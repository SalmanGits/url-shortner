const express = require('express')
const router = express.Router()
const verifyToken = require('../auth/auth.js')
const {createLink} = require("../controllers/link.controllers.js")

router.post("/create", verifyToken, createLink)



module.exports = router