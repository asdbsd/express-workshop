const { getAction, createAction, attachIndex, attachCreate } = require('../controllers/accessoryController');
const { isLoggedIn } = require('../services/util');

const createAccessoryRouter = require('express').Router();

createAccessoryRouter.get('/', isLoggedIn(), getAction);
createAccessoryRouter.post('/', isLoggedIn(), createAction);
createAccessoryRouter.get('/attach/:id', isLoggedIn(), attachIndex);
createAccessoryRouter.post('/attach/:id', isLoggedIn(), attachCreate);

module.exports = createAccessoryRouter;