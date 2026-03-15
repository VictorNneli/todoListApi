const fs = require('fs');
const path = require('path');
const { sendResponse } = require('../utils/response');
const dbPath = path.join(__dirname, '../database.json');

const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

exports.getAllNotes = (req, res, next) => {
  try {
    const db = readDB();
    sendResponse(res, 200, 'Notes retrieved successfully', db.notes);
  } catch (err) {
    next(err);
  }
};

exports.getNoteById = (req, res, next) => {
  try {
    const db = readDB();
    const note = db.notes.find(t => t.id === parseInt(req.params.id));
    if (!note) {
      const error = new Error('Note not found');
      error.status = 404;
      throw error;
    }
    sendResponse(res, 200, 'Note retrieved successfully', note);
  } catch (err) {
    next(err);
  }
};

exports.createNote = (req, res, next) => {
  try {
    const db = readDB();
    const newNote = { id: db.notes.length + 1, ...req.body };
    db.notes.push(newNote);
    writeDB(db);
    sendResponse(res, 201, 'Note created successfully', newNote);
  } catch (err) {
    next(err);
  }
};

exports.updateNote = (req, res, next) => {
  try {
    const db = readDB();
    const index = db.notes.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
      const error = new Error('Note not found');
      error.status = 404;
      throw error;
    }
    db.notes[index] = { ...db.notes[index], ...req.body };
    writeDB(db);
    sendResponse(res, 200, 'Note updated successfully', db.notes[index]);
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = (req, res, next) => {
  try {
    const db = readDB();
    const index = db.notes.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
      const error = new Error('Note not found');
      error.status = 404;
      throw error;
    }
    db.notes.splice(index, 1);
    writeDB(db);
    sendResponse(res, 200, 'Note deleted successfully', null);
  } catch (err) {
    next(err);
  }
};

