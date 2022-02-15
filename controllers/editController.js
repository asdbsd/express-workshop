const { carViewModel } = require("../services/util");

const editIndex = async(req, res) => {
    const car = carViewModel(await req.storage.getCar(req.params.id));

    if(!req.session.hasOwnProperty('user') || car.owner != req.session.user.id) {
        console.log('Not Owner')
        return res.redirect('/login');
    } else {
        console.log('Owner')
    }

    res.render('edit', { car, title: 'Edit Page'})
};

const editAction = async (req, res) => {
    const car = carViewModel(await req.storage.getCar(req.params.id));

    if(!req.session.hasOwnProperty('user') || car.owner != req.session.user.id) {
        res.redirect('/login');
    }

    try {
        await req.storage.editCar(car);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.redirect('/404')
    }

};

module.exports = {
    editAction,
    editIndex
}