const deleteRouter = require('express').Router();

const { deleteIndex, deleteAction } = require('../controllers/deleteController');
const { isLoggedIn } = require('../services/util');

deleteRouter.get('/:id', isLoggedIn(), deleteIndex);
deleteRouter.post('/:id', isLoggedIn(), deleteAction);

module.exports = deleteRouter;