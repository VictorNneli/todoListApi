const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const validate = require('../middleware/validate');
const { createTodoSchema, updateTodoSchema, idParamSchema } = require('../validators/todoValidator');

/**
 * @swagger
 * tags:
 *   - name: Todos
 *     description: Todo management endpoints
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Todos retrieved successfully
 */
router.get('/', todoController.getAllTodos);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo retrieved successfully
 *       404:
 *         description: Todo not found
 */
router.get('/:id', validate(idParamSchema, 'params'), todoController.getTodoById);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Todo created successfully
 */
router.post('/', validate(createTodoSchema), todoController.createTodo);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 */
router.put('/:id', validate(idParamSchema, 'params'), validate(updateTodoSchema), todoController.updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
router.delete('/:id', validate(idParamSchema, 'params'), todoController.deleteTodo);

module.exports = router;
