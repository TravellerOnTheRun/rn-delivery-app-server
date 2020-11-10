const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//Calls
router.get('/calls', isAuth, adminController.getCalls);

router.delete('/call/:callId', isAuth, adminController.deleteCall);

//Orders
router.post('/order', isAuth, adminController.postOrder);

router.get('/orders', isAuth, adminController.getOrders);

router.put('/order', isAuth, adminController.putOrder);

//Clients
router.get('/clients', isAuth, adminController.getClients);

router.post('/client', isAuth, adminController.postClient);

module.exports = router;