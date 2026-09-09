const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Cuando el navegador pida la raíz ('/'), se ejecuta la función 'home'
router.get('/', mainController.home);

module.exports = router;