const express = require('express');

const formsController = require('../controllers/forms');

const router = express.Router();

router.post('/call', formsController.postCall);

router.get('/calls', formsController.getCalls);

module.exports = router;