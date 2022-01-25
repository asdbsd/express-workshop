const fs = require('fs/promises');

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
    let id;
    const cars = await read();

    do {
        id = nextId();
    } while (cars.hasOwnProperty(id));

    cars[id] = car;

    await write(cars);
}

const nextId = () => {
    return 'xxxxxxxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}

const getAll = async (query) => {
    const data = await read();
    let cars = Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, { id }, v));


    if (query.search) {
        cars = cars.filter(c => c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()));
    }

    if (query.from) {
        cars = cars.filter(c => c.price >= Number(query.from));
    }

    if (query.to) {
        cars = cars.filter(c => c.price <= Number(query.to));
    }


    return cars;
}

const getCar = async (id) => {
    const cars = await read();
    const car = cars.filter(car => car.id == id)[0];

    if (car) {
        return Object.assign({}, { id }, car);
    } else {
        return undefined;
    }
}

const deleteCar = async (id) => {
    let cars = await getAll({});
    cars = cars.filter(car => car.id != id);
    await write(cars);
}

const carsMiddleWare = (req, res, next) => {
    req.storage = {
        getAll,
        getCar,
        createCar,
        deleteCar
    };
    next();
};

module.exports = carsMiddleWare;
