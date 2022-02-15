const { redirect } = require("express/lib/response");

const createIndex = (req, res) => {
    res.render('Create', { title: 'Create Car Listing'});
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
        console.log('Error creating record');
        res.redirect('/create')
    }
    
};


module.exports = { 
    createIndex,
    createAction
};