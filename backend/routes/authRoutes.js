const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/authController');

// Rute untuk login: http://localhost:5000/api/auth/login
router.post('/login', loginAdmin);

module.exports = router;