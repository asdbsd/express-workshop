const detailsController = async (req, res) => {
    const car = await req.storage.getCar(req.params.id);

    if(car) {
        res.render('details', { car, title: `${car.name} Details` });
    } else {
        res.redirect('/404');
    }
}

module.exports = { 
    detailsController
}