const homeController = async (req, res) => {
    const cars = await req.storage.getAll(req.query);

    res.render('index', { cars, title: 'Home Page', query: req.query});
}

module.exports = { 
    homeController
};