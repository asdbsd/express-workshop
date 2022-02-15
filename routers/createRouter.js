const createRouter = require('express').Router();

const { createIndex, createAction } = require('../controllers/createController');
const { isLoggedIn } = require('../services/util');

createRouter.get('/', isLoggedIn(), createIndex);
createRouter.post('/', isLoggedIn(), createAction);

module.exports = createRouter;