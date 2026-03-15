const fs = require('fs');
const path = require('path');
const { sendResponse } = require('../utils/response');

const dbPath = path.join(__dirname, '../database.json');

const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

exports.getAllTodos = (req, res, next) => {
  try {
    const db = readDB();
    sendResponse(res, 200, 'Todos retrieved successfully', db.todos);
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = (req, res, next) => {
  try {
    const db = readDB();
    const todo = db.todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
      const error = new Error('Todo not found');
      error.status = 404;
      throw error;
    }
    sendResponse(res, 200, 'Todo retrieved successfully', todo);
  } catch (err) {
    next(err);
  }
};

exports.createTodo = (req, res, next) => {
  try {
    const db = readDB();
    const newTodo = { id: db.todos.length + 1, ...req.body };
    db.todos.push(newTodo);
    writeDB(db);
    sendResponse(res, 201, 'Todo created successfully', newTodo);
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = (req, res, next) => {
  try {
    const db = readDB();
    const index = db.todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
      const error = new Error('Todo not found');
      error.status = 404;
      throw error;
    }
    db.todos[index] = { ...db.todos[index], ...req.body };
    writeDB(db);
    sendResponse(res, 200, 'Todo updated successfully', db.todos[index]);
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = (req, res, next) => {
  try {
    const db = readDB();
    const index = db.todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
      const error = new Error('Todo not found');
      error.status = 404;
      throw error;
    }
    db.todos.splice(index, 1);
    writeDB(db);
    sendResponse(res, 200, 'Todo deleted successfully', null);
  } catch (err) {
    next(err);
  }
};
