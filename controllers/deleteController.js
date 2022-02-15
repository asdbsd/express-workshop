const deleteIndex = async (req, res) => {

    if(!req.session.hasOwnProperty('user')) {
        console.log('Not Owner')
        return res.redirect('/login');
    } else {
        console.log('Owner')
    }

    res.render('delete', { car, title: 'Delete Page' })
};

const deleteAction = async(req,res) => {
    const car = await req.storage.getCar(req.params.id);

    if(!req.session.hasOwnProperty('user') || car.owner != req.session.user.id) {
        console.log('Not Owner')
        return res.redirect('/login');
    } else {
        console.log('Owner')
    }

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