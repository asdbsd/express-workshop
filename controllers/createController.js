const createRouter = require('express').Router();

createRouter.get('/', (req, res) => {
    res.render('Create', { title: 'Create Car Listing'});
});

createRouter.post('/', async (req, res) => {
    const car = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price)
    };

    await req.storage.createCar(car);
    res.redirect('/');
});


module.exports = { 
    createRouter
};