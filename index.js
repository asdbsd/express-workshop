const app = require('./app');
const port = 3000;
const initDb = require('./models/index');

const start = async () => {
    await initDb();
    app.listen(port, () => console.log(`Listening on port: ${port}`));
};

start();