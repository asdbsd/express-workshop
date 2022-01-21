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

const write = async(data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data));
    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1);
    }
}

const getAll = async () => {
    const data = await read();
    return Object
            .entries(data)
            .map(([id, v]) => Object.assign({}, { id }, v));
}

const getCar = async (id) => {
    const cars = await read();
    const car = cars[id];

    if(car) {
        return Object.assign({}, { id }, car);
    } else {
        return undefined;
    }
}

const carsMiddleWare = (req, res, next) => {
    req.storage = {
        getAll,
        getCar
    };
    next();
};

module.exports = carsMiddleWare;
