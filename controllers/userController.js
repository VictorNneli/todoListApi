const fs = require('fs');
const path = require('path');
const { sendResponse } = require('../utils/response');

const dbPath = path.join(__dirname, '../database.json');
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));


exports.getAllUsers = (req, res, next) => {
  try {
    const db = readDB();
    sendResponse(res, 200, 'Users retrieved successfully', db.users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = (req, res, next) => {
  try {
    const db = readDB();
    const user = db.users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    sendResponse(res, 200, 'User retrieved successfully', user);
  } catch (err) {
    next(err);
  }
};

exports.createUser = (req, res, next) => {
  try {
    const db = readDB();
    const newUser = { id: db.users.length + 1, ...req.body };
    db.users.push(newUser);
    writeDB(db);
    sendResponse(res, 201, 'User created successfully', newUser);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = (req, res, next) => {
  try {
    const db = readDB();
    const index = db.users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    db.users[index] = { ...db.users[index], ...req.body };
    writeDB(db);
    sendResponse(res, 200, 'User updated successfully', db.users[index]);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    const db = readDB();
    const index = db.users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    db.users.splice(index, 1);
    writeDB(db);
    sendResponse(res, 200, 'User deleted successfully', null);
  } catch (err) {
    next(err);
  }
};
