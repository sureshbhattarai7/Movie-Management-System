const express = require('express');

const router = express.Router();
const bookingController = require('./../Controller/bookingController');
const authController = require('./../Controller/authController');

router.get('/checkout-session/:movieID',
    authController.protect,
    bookingController.getCheckoutSession);

module.exports = router;