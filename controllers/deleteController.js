const deleteRouter = require('express').Router();

deleteRouter.get('/:id', async (req, res) => {
    const car = await req.storage.getCar(req.params.id);

    res.render('delete', { car, title: 'Delete Page' })
});

deleteRouter.post('/:id', async(req,res) => {
    await req.storage.deleteCar(req.params.id);
    res.redirect('/');
});


module.exports = {
    deleteRouter
};