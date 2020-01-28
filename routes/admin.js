const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/calls', adminController.getCalls);

router.delete('/call/:callId', adminController.deleteCall);

module.exports = router;