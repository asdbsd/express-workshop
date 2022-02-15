const { loginIndex, login, registerIndex, register, logout } = require('../controllers/authController');
const { isLoggedIn } = require('../services/util');

const loginRouter = require('express').Router();
const registerRouter = require('express').Router();
const logoutRouter = require('express').Router();


// Login routes
loginRouter.get('/', loginIndex);
loginRouter.post('/', login);

// Register routes
registerRouter.get('/', registerIndex);
registerRouter.post('/', register);

// Logout route
logoutRouter.get('/logout', isLoggedIn(), logout);

module.exports = {
    loginRouter,
    registerRouter,
    logoutRouter
};