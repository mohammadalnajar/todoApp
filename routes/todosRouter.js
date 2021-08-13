const express = require('express');
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todosController');
const router = express.Router();

// get all todos
router.get('/', getAllTodos);

// create new todo
router.post('/', createTodo);

// update one todo
router.put('/', updateTodo);

//delete one todo
router.delete('/', deleteTodo);

module.exports = router;
