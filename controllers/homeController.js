const homeController = async (req, res) => {
    const cars = await req.storage.getAll();
    res.render('index', { cars, title: 'Home Page' });
}

module.exports = { 
    homeController
};