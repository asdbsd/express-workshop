const { redirect } = require("express/lib/response");

const createIndex = (req, res) => {
    res.render('Create', { title: 'Create Car Listing'});
};

const createAction = async (req, res) => {
    const car = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price)
    };

    try {
        await req.storage.createCar(car);
        res.redirect('/');
    } catch (err) {
        console.log('Error creating record');
        redirect('/create')
    }
    
};


module.exports = { 
    createIndex,
    createAction
};