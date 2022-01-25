const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('Create', { title: 'Create Car Listing'});
});

router.post('/', async (req, res) => {
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
    router
};