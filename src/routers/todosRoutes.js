const express = require('express');
const todoController = require('./../controllers/todoController');

const router = express.Router();

// router.param('id', todoController.checkID);

router
  .route('/')
  .get(todoController.getAllTodos);
  

router
.route('/create')
.get(todoController.getCreateTodo)
.post(todoController.createTodo);

router
  .route('/:id')
  .get(todoController.getTodo)
   .delete(todoController.deleteTodo);

router
  .route('/:id/edit')
  .get(todoController.getEditTodo)
  .patch(todoController.updateTodo);

module.exports = router;