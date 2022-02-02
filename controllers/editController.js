const editIndex = async(req,res) => {
    const car = await req.storage.getCar(req.params.id);
    res.render('edit', { car, title: 'Edit Page'})
};

const editAction = async (req, res) => {
    const id = req.params.id
    const car = {
        id: id,
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price)
    };

    await req.storage.editCar(car);
    res.redirect('/');
};

module.exports = {
    editAction,
    editIndex
}