const editRouter = require('express').Router();
const { editIndex, editAction } = require('../controllers/editController');
const { isLoggedIn } = require('../services/util');

editRouter.get('/:id', editIndex);
editRouter.post('/:id', editAction);

module.exports = editRouter;