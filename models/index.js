const mongoose = require('mongoose');

require('./Car');
require('./Accessory');

const connectionString = "mongodb://127.0.0.1:27017/cars";

const init = async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Connected!');

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
        })
    } catch (err) {
        console.error('Error connecting to database');
        process.exit(1);
    }

};

module.exports = init;