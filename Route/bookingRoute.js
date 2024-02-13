const express = require('express');
const router = express.Router();
const bookingController = require('./../Controller/bookingController');
const authController = require('./../Controller/authController');

router.route('/check-availability').post(bookingController.checkSeatAvailability);
router.route('/khalti')
    .post(authController.protect, bookingController.createBooking)
    .get(bookingController.getBooking);

module.exports = router;