const express = require('express');
const port = 3000;
const hbs = require('express-handlebars');

const { aboutController } = require('./controllers/aboutController');
const { createRouter } = require('./controllers/createController');
const { detailsController } = require('./controllers/detailsController');
const { homeController } = require('./controllers/homeController');
const { errorController } = require('./controllers/errorController');
const { deleteRouter } = require('./controllers/deleteController');



const carsMiddleWare = require('./services/cars');

const app = express();

app.engine('.hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');


app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(carsMiddleWare);

app.get('/', homeController)
app.get('/about', aboutController)
app.get('/details/:id', detailsController);
app.use('/create', createRouter);
app.use('/delete', deleteRouter)


app.get('/404', errorController);


app.listen(port, () => console.log(`Listening on port: ${port}`));