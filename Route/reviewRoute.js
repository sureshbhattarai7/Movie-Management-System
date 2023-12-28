const express = require('express');
const reviewController = require('./../Controller/reviewController');
const authController = require('./../Controller/authController');

// POST /movies/234dsarfe/reviews
// POST /movies/reviews

const Router = express.Router({mergeParams: true});

Router.route('/')
    .post(authController.protect, authController.restrictTo('user'), reviewController.createReview)
    .get(reviewController.getReviews);

Router.route('/:id')
    .get(reviewController.getReview)
    .patch(authController.protect, authController.restrictTo('user'), reviewController.updateReview)
    .delete(authController.protect, authController.restrictTo('user'), reviewController.deleteReview);

module.exports = Router;