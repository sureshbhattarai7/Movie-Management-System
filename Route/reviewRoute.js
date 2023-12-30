const express = require('express');
const reviewController = require('./../Controller/reviewController');
const authController = require('./../Controller/authController');

const Router = express.Router({ mergeParams: true });

// POST /movies/234dsarfe/reviews
// POST /movies/reviews

Router.route('/')
    .post(//authController.protect,
        //authController.restrictTo('user'),
        reviewController.setMovieUserIds,
        reviewController.createReview)
    .get(reviewController.getReviews);

Router.route('/:id')
    .get(reviewController.getReview)
    .patch(authController.protect, authController.restrictTo('user'), reviewController.updateReview)
    .delete(authController.protect, authController.restrictTo('user'), reviewController.deleteReview);

module.exports = Router;