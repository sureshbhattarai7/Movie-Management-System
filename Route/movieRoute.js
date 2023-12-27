const express = require('express');
const router = express.Router();
const movieController = require('./../Controller/movieController');
const authController = require('./../Controller/authController');
const reviewController = require('./../Controller/reviewController');

router.route('/')
    .post(authController.protect,
        authController.restrictTo('admin'),
        movieController.createMovie)
    .get(movieController.getMovies);

router.route('/:id')
    .get(movieController.getMovie)
    .patch(authController.protect,
        authController.restrictTo('admin'),
        movieController.updateMovie)
    .delete(authController.protect,
        authController.restrictTo('admin'),
        movieController.deleteMovie);


// POST /tour/1234fbcdsj/reviews
// GET /tour/1234fbcdsj/reviews
// /tour/1234fbcdsj/reviews/3434fweun

router.route('/:movieId/reviews')
    .post(authController.protect,
        authController.restrictTo('user'),
        reviewController.createReview);

module.exports = router;