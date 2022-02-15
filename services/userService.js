const { register } = require('../controllers/authController');
const User = require('../models/User');

const registerUser = async (session, username, password) => {
    const user = new User({
        username,
        hashedPassword: password
    });

    await user.save();

    session.user = {
        id: user._id,
        username: user.username
    }
}

const loginUser = async (session, username, password) => {
    const user = await User.findOne({ username });

    if(user && await user.comparePassword(password)) {
        session.user = {
            id: user._id,
            username: user.username
        }
        return true
    } else {
        throw new Error('Incorrect username or password');
    }
}

const logoutSession = (session) => {
    delete session.user;
}

const userMiddleware = (req, res, next) => {
    req.auth = {
        registerUser: (...params) => registerUser(req.session, ...params),
        loginUser: (...params) => loginUser(req.session, ...params),
        logoutUser: () => logoutSession(req.session)
    };

    if(req.session.user) {
        res.locals.user = req.session.user;
        res.locals.hasUser = true;
    }

    next();
};

module.exports = userMiddleware;