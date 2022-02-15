const { request } = require("express");

const registerIndex = (req, res) => {
    res.render('register', { title: 'Register'});
}

const register = async(req, res) => {
    console.log(req.body)
    const validUsername = req.body.username !== '' ? req.body.username : undefined;
    const validPassword = (req.body.password !== '' && req.body.password == req.body.repass) ? req.body.password : undefined;
    
    if(validUsername === undefined || validPassword === undefined) {
        res.render('register', { title: 'Register'});
    } 

    try {
        await req.auth.registerUser(req.body.username, req.body.password);
        res.redirect('/')
    } catch(err) {
        console.log(err);
        res.redirect('/register');
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