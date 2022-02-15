const { getAction, createAction, attachIndex, attachCreate } = require('../controllers/accessoryController');
const { isLoggedIn } = require('../services/util');

const createAccessoryRouter = require('express').Router();

createAccessoryRouter.get('/', getAction);
createAccessoryRouter.post('/', createAction);
createAccessoryRouter.get('/attach/:id', attachIndex);
createAccessoryRouter.post('/attach/:id', attachCreate);

module.exports = createAccessoryRouter;