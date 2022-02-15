const deleteRouter = require('express').Router();

const { deleteIndex, deleteAction } = require('../controllers/deleteController');
const { isLoggedIn } = require('../services/util');

deleteRouter.get('/:id', deleteIndex);
deleteRouter.post('/:id', deleteAction);

module.exports = deleteRouter;