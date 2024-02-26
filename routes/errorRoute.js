const express = require('express');
const router = express.Router();

// Import the controller function
const errorController = require('../controllers/errorController');

router.get('/trigger-error', errorController.renderErrorPage);

module.exports = router;