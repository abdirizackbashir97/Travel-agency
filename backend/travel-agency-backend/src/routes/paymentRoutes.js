const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/initiate', paymentController.initiatePayment);
router.get('/status/:checkoutRequestId', paymentController.queryPaymentStatus);
router.post('/callback', paymentController.handleCallback);
router.get('/transactions', paymentController.getTransactionHistory);
router.get('/transaction/:id', paymentController.getTransactionById);

module.exports = router;
