const express = require('express');
const router = express.Router();
const movieController = require('./../Controller/movieController');
const authController = require('./../Controller/authController');
const reviewRouter = require('./../Route/reviewRoute');

// POST /tour/1234fbcdsj/reviews
// GET /tour/1234fbcdsj/reviews

router.use('/:movieId/reviews', reviewRouter);

router.route('/')
    .post(//authController.protect,
        //authController.restrictTo('admin'),
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

module.exports = router;