const Accessory = require('../models/Accessory');
const { accessoryViewModel } = require('./util');

const createAccessory = async (accessory) => {
    const newAccessory = new Accessory(accessory);
    await newAccessory.save();
};

const getAll = async () => {
    const data = await Accessory.find({});
    return data.map(accessoryViewModel);
}

const accessoryMiddleware = (req, res, next) => {
    req.accessory = {
        createAccessory,
        getAll,

    }
    next();
}

module.exports = accessoryMiddleware;

