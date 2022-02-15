const editRouter = require('express').Router();
const { editIndex, editAction } = require('../controllers/editController');
const { isLoggedIn } = require('../services/util');

editRouter.get('/:id', isLoggedIn(), editIndex);
editRouter.post('/:id', isLoggedIn(), editAction);

module.exports = editRouter;