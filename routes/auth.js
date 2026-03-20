const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const { loginSchema, refreshTokenSchema } = require('../validators/authValidator');

router.post('/login', validate(loginSchema), authController.login);

router.post('/refresh', validate(refreshTokenSchema), authController.refreshToken);

module.exports = router;