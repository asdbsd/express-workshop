const deleteIndex = async (req, res) => {
    const car = await req.storage.getCar(req.params.id);
    res.render('delete', { car, title: 'Delete Page' })
};

const deleteAction = async(req,res) => {
    try {
        await req.storage.deleteCar(req.params.id);
        res.redirect('/');
    } catch(err) {
        console.log('Attemted to delete non-existing car.')
        res.redirect('/404');
    }
};

module.exports = {
    deleteIndex,
    deleteAction
};