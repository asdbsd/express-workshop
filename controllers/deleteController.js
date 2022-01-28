const deleteIndex = async (req, res) => {
    const car = await req.storage.getCar(req.params.id);
    res.render('delete', { car, title: 'Delete Page' })
};

const deleteAction = async(req,res) => {
    await req.storage.deleteCar(req.params.id);
    res.redirect('/');
};

module.exports = {
    deleteIndex,
    deleteAction
};