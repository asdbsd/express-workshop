const editRouter = require('express').Router();
const { editIndex, editAction } = require('../controllers/editController');

editRouter.get('/:id', editIndex);
editRouter.post('/:id', editAction);

module.exports = editRouter;