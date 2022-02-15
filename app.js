require('./apiConfig');
const express = require('express');
const hbs = require('express-handlebars');
const expressSession = require('express-session');

const createRouter = require('./routers/createRouter');
const deleteRouter = require('./routers/deleteRouter');
const editRouter = require('./routers/editRouter');
const createAccessoryRouter = require('./routers/createAccessoryRouter');

const { aboutController } = require('./controllers/aboutController');
const { detailsController } = require('./controllers/detailsController');
const { homeController } = require('./controllers/homeController');
const { errorController } = require('./controllers/errorController');

const carsMiddleWare = require('./services/cars');
const accessoryMiddleware = require('./services/accessory');
const { loginRouter, registerRouter, logoutRouter } = require('./routers/ahtRouter');
const userMiddleware = require('./services/userService');

const app = express();

app.engine('.hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');

app.use(expressSession({
    secret: process.env['SECRET'],
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(carsMiddleWare);
app.use(accessoryMiddleware);
app.use(userMiddleware);

app.get('/', homeController)
app.get('/about', aboutController)
app.get('/details/:id', detailsController);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.get('/logout', logoutRouter);
app.use('/create', createRouter);
app.use('/delete', deleteRouter);
app.use('/edit', editRouter)
app.use('/accessory', createAccessoryRouter);

app.get('/404', errorController);

module.exports = app;