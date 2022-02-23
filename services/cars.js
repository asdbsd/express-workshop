const { redirect } = require('express/lib/response');
const Car = require('../models/Car');
const { carViewModel } = require('./util');


const createCar = async (car) => {
    const result = new Car(carViewModel(car));
    try {
        await result.save();

    } catch(err) {
        console.log(err);
        throw err;
    }
}


const getAll = async (query) => {
    const options = {};

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }

    if (query.from) {
        options.price = { $gte: Number(query.from) };
    }

    if (query.to) {
        if(!options.price) {
            options.price = {};
        }
        options.price.$lte = Number(query.to);
    }

    const cars = await Car.find(options);
    return cars.map(carViewModel);

}

const getCar = async (id) => {
    const car = await Car.findById(id).populate('accessories');

    if (car) {
        return carViewModel(car);
    } else {
        return undefined;
    }
}

const editCar = async (car) => {
    let existing = await Car.findById(car.id);

    existing.name = car.name;
    existing.description = car.description || undefined;
    existing.imageUrl = car.imageUrl;
    existing.price = Number(car.price);

    await existing.save();
}

const attachAccessory = async (carId, accessoryId) => {
    const existing = await Car.findById(carId);
    existing.accessories.push(accessoryId);

    await existing.save();
}

const deleteCar = async (id) => {
    await Car.findByIdAndDelete(id);
}

const carsMiddleWare = (req, res, next) => {
    req.storage = {
        getAll,
        getCar,
        createCar,
        deleteCar,
        editCar,
        attachAccessory
    };
    next();
};

module.exports = carsMiddleWare;


// const nextId = () => {
//     return 'xxxxxxxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
// }