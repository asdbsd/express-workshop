const res = require("express/lib/response");

const getAction = (req, res) => {
    res.render('createAccessory', { title: 'Create Accessory' });
}

const createAction = async (req, res) => {
    const accessory = {
        name: req.body.name,
        description: req.body.description || undefined,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price)
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
        console.log(err.message);
        res.redirect('/404');
    }
    

;}

const attachCreate = async (req, res) => {
    const carId = req.params.id;
    const accessoryId = req.body.accessory;

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