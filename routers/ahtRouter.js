const { body } = require('express-validator');

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
registerRouter.post('/',
    body('username')
        .trim()
        .isLength({ min: 5 }).withMessage('Username should be minimum 5 characters long!')
        .isAlphanumeric().withMessage('Username must consist of characters and numbers only!'),
    body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Password should be minimum 8 characters long!')
        .isAlphanumeric().withMessage('Password must consist of characters and numbers only!'),
    body('repass')
        .custom((value, { req }) => value === req.body.password).withMessage('Passwords must match!'),
register);

// Logout route
logoutRouter.get('/logout', isLoggedIn(), logout);

module.exports = {
    loginRouter,
    registerRouter,
    logoutRouter
};