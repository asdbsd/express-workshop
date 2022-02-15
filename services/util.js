const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    return bcrypt.hash(password, 9);
}

const comparePasswords = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

const accessoryViewModel = (accessory) => {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        price: Number(accessory.price),
        owner: accessory.owner
    }
};

const isLoggedIn = () => {
    return function (req, res, next) {
        if(req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

const carViewModel = (car) => {
    const model = {
        name: car.name,
        description: car.description || undefined,
        imageUrl: car.imageUrl,
        price: car.price,
        accessories: car.accessories || [],
        owner: car.owner
    };

    if(car._id) {
        model.id = car._id.toString();
    }

    if(model.accessories.length > 0 && model.accessories[0].name) {
        model.accessories = model.accessories.map(accessoryViewModel);
    } 

    return model;
    
}

module.exports = {
    accessoryViewModel,
    carViewModel,
    hashPassword,
    comparePasswords,
    isLoggedIn
}