require("dotenv").config()
const express = require('express');
const cors = require('cors');
const helmet = require("helmet")
const morgan = require('morgan')
const app = express()
const { connectToDb } = require("./connection/db.js");
const errorHandler = require("./middleware/errorHandler.js");
const userRoutes = require("./routes/user.route.js")
const linkRoutes = require("./routes/link.route.js");
const { incrementLink } = require("./controllers/link.controllers.js");
const PORT = process.env.PORT || 3000
//middlewares
app.use(cors())
app.use(helmet())
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//db connection
connectToDb()
//routes
//handling increment and redirect
app.get("/:urlId", incrementLink)
app.use("/api/auth",userRoutes)
app.use("/api/link",linkRoutes)
//error handler
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})