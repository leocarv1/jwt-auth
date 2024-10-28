const express = require('express')

// Controllers
const UserController = require("../controllers/UserController")

// Middlewares
const middlewares = require("../middlewares")

const routes = express.Router();

routes.all('/api/*', middlewares.checkToken)

// Private router
routes.get('/api/user/:id', UserController.private)

// Register user
routes.post('/auth/register', UserController.auth)

// Login
routes.post('/auth/login', UserController.login)

module.exports = routes