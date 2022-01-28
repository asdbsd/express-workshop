const createRouter = require('express').Router();

const { createIndex, createAction } = require('../controllers/createController');

createRouter.get('/', createIndex);
createRouter.post('/', createAction);

module.exports = createRouter;