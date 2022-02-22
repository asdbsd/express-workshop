const { validationResult } = require("express-validator");

const registerIndex = (req, res) => {
    res.render('register', { title: 'Register' });
}

const register = async(req, res) => {
    const { errors } = validationResult(req);

    try {
        if(errors.length > 0) {
            throw errors;
        }

        await req.auth.registerUser(req.body.username, req.body.password);
        res.redirect('/')
    } catch(err) {
        res.locals.errors = err
        res.render('register', { title: 'Register', data: { username: req.body.username } });
    }
}

const loginIndex = (req, res) => {
    res.render('login', { title: 'Login', isValidated: true });
}

const login = async(req, res) => {

    try {
        await req.auth.loginUser(req.body.username, req.body.password);
        res.redirect('/')
    } catch(err) {
        res.render('login', { title: 'Login', isValidated: false, username:req.body.username });
    }
}

const logout = (req, res) => {
    req.auth.logoutUser();
    res.redirect('/');
}

module.exports = {
    registerIndex,
    register,
    loginIndex,
    login,
    logout
}