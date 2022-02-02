const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    price: Number
});

const Car = model('Car', carSchema);

module.exports = Car;