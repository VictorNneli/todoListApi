const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const validate = require('../middleware/validate');
const { createNoteSchema, updateNoteSchema, idParamSchema } = require('../validators/noteValidator');

/** 
 * @swagger
 * tags:
 *   - name: Notes
 *     description: Note management endpoints
 */

/**
 * @swagger
 * /notes:
 *  get:
 *    summary: Get all notes
 *    tags: [Notes]
 *    responses:
 *      200:
 *        description: Notes retrieved successfully
 */
router.get('/', noteController.getAllNotes);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Note retrieved successfully
 *       404:
 *         description: Note not found
 */
router.get('/:id', validate(idParamSchema, 'params'), noteController.getNoteById);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
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
 *         description: Note created successfully
 */
router.post('/', validate(createNoteSchema), noteController.createNote);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update note
 *     tags: [Notes]
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
 *         description: Note updated successfully
 *       404:
 *         description: Note not found
 */
router.put('/:id', validate(idParamSchema, 'params'), validate(updateNoteSchema), noteController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 */
router.delete('/:id', validate(idParamSchema, 'params'), noteController.deleteNote);

module.exports = router;