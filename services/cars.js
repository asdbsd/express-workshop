const fs = require('fs/promises');
const { resourceLimits } = require('worker_threads');
const Car = require('../models/Car');

const filePath = './services/data.json'

const read = async () => {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1);
    }

}

const write = async (data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1);
    }

}

const createCar = async (car) => {
    const result = new Car(car);
    await result.save();
}

// const nextId = () => {
//     return 'xxxxxxxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
// }

const carViewModel = (car) => {
    return {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price
    }
}

const getAll = async (query) => {
    const options = {};

    if (query.search) {
        options.name = new RegExp(querySearch, 'i');
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
    const car = await Car.findById(id);

    if (car) {
        return carViewModel(car);
    } else {
        return undefined;
    }
}

const editCar = async (car) => {
    let cars = await read();
    let carData = await getCar(car.id);

    if (carData) {
        cars = cars.map(vehicle => vehicle.id == car.id ? vehicle = car : vehicle);
        await write(cars);
    } else {
        throw ReferenceError('No such ID in database');
    }
}

const deleteCar = async (id) => {
    let cars = await read();
    const car = await getCar(id);

    if (car) {
        cars = cars.filter(car => car.id != id);
        await write(cars);
    } else {
        throw ReferenceError('No such ID in database');
    }
}

const carsMiddleWare = (req, res, next) => {
    req.storage = {
        getAll,
        getCar,
        createCar,
        deleteCar,
        editCar
    };
    next();
};

module.exports = carsMiddleWare;
