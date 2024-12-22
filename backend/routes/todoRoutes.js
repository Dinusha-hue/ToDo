const express = require('express');
const { getTodos, addTodo, updateTodo, deleteTodo, getTodoById } = require('../controllers/todoController');

const router = express.Router();

router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
