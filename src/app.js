require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Routes
const route = require('./routes')

const app = express()

app.use(express.json())
app.use(route)


// Credentials
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS


mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.copoy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(process.env.PORT)
        console.log("Server on")
    })
    .catch((err) => console.log(err))

module.exports = app