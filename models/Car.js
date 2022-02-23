const { Schema, model, Types: { ObjectId } } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: [true, 'Name is required!'], minlength: 3 },
    description: { type: String, default: 'No Description' },
    imageUrl: { type: String, required: [true, 'Image Url is required!'], minLength: 5 },
    price: { type: Number, required: [true, 'Price is required!'] },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
    owner: { type: ObjectId, ref: 'User' }
});

const Car = model('Car', carSchema);

module.exports = Car;