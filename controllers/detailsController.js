const detailsController = async (req, res) => {
    const car = await req.storage.getCar(req.params.id);

    if(req.session.hasOwnProperty('user') && car.hasOwnProperty('owner') && car.owner == req.session.user.id) {
        car.isOwner = true;
    }

    if(car) {
        res.render('details', { car, title: `${car.name} Details` });
    } else {
        res.redirect('/404');
    }
}

module.exports = { 
    detailsController
}