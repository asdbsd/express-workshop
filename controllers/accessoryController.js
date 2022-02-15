const getAction = async (req, res) => {

    if(!req.session.hasOwnProperty('user')) {
        return res.redirect('/login');
    }

    res.render('createAccessory', { title: 'Create Accessory' });
}

const createAction = async (req, res) => {

    if(!req.session.hasOwnProperty('user')) {
        return res.redirect('/login');
    }

    const accessory = {
        name: req.body.name,
        description: req.body.description || undefined,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        owner: req.session.user.id
    };

    try {
        await req.accessory.createAccessory(accessory);
        res.redirect('/');
        
    } catch(err) {
        console.log('Error creating accessory');
        console.log(err.message);
        res.redirect('/accessory')
    }
};

const attachIndex = async (req, res) => {
    const id = req.params.id

    try {
        const [car, accessories] = await Promise.all([
            req.storage.getCar(id),
            req.accessory.getAll()
        ]);
        const existingIds = car.accessories.map(a => a.id.toString());
        const availableAccessories = accessories.filter(a => existingIds.includes(a.id.toString()) == false);
        
        res.render('attach', { title: 'Attach Accessory', car, accessories: availableAccessories });
    } catch(err) {
        console.log('Error while searching coresponding car');
        res.redirect('/404');
    }
    

;}

const attachCreate = async (req, res) => {
    const carId = req.params.id;
    const accessoryId = req.body.accessory;

    if(!req.session.hasOwnProperty('user')) {
        return res.redirect('/login');
    }

    try {
        await req.storage.attachAccessory(carId, accessoryId);
        res.redirect(`/details/${carId}`);
    } catch(err) {
        console.log('Error creating record');
        res.redirect('/accessory/attach/' + carId)
    }


}

module.exports = {
    getAction,
    createAction,
    attachIndex,
    attachCreate
}