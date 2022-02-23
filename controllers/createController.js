const { redirect } = require("express/lib/response");
const { mapError } = require("../services/util");

const createIndex = (req, res) => {
    res.render('create', { title: 'Create Car Listing'});
};

const createAction = async (req, res) => {
    const userId = req.session.user.id;
    const car = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        owner: userId
    };

    try {
        await req.storage.createCar(car);
        res.redirect('/');
    } catch (err) {
        res.locals.errors = mapError(err);
        res.render('create', { title: 'Create Car Listing' });
    }
    
};


module.exports = { 
    createIndex,
    createAction
};