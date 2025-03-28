const express = require('express');
const control = require('../controllers/controller');

const router = express.Router();

// Example routes - candidates will need to adjust these based on their schema design
router.get('/data', control.getData);

module.exports = router;
