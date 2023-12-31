const Review = require('./../Model/reviewModel');
const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/appError');

// exports.setMovieUserIds = (req, res, next) => {
//     //Allow nested routes
//     if (!req.body.movie) req.body.movie = req.params.movieId;
//     if (!req.body.user) req.body.user = req.user.id;
//     next();
// };

// exports.createReview = factory.createOne(Review);
// exports.updateReview = factory.updateOne(Review);
// exports.deleteReview = factory.deleteOne(Review);
// exports.getReview = factory.getOne(Review);
// exports.getReviews = factory.getAll(Review);

exports.createReview = catchAsync(async (req, res, next) => {
    //Allow nested routes
    if (!req.body.movie) req.body.movie = req.params.movieId;
    if (!req.body.user) req.body.user = req.user.id;
    
    const review = await Review.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            review
        }
    });
});



exports.getReviews = catchAsync(async (req, res, next) => {
    let filter = {}
    if (req.params.movieId) filter = { movie: req.params.movieId };
    
    const review = await Review.find(filter);
    res.status(200).json({
        status: 'success',
        totalReview: review.length,
        data: {
            review
        }
    });
});

exports.getReview = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
        return next(new AppError('Can not find review with that ID!', 400));
    };

    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
});


exports.updateReview = catchAsync(async (req, res, next) => {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedReview) {
        return next(new AppError('Can not find review with that ID!'));
    };

    res.status(200).json({
        status: 'success',
        data: {
            updatedReview
        }
    })
});

exports.deleteReview = catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
        return next(new AppError('Can not find Review with that ID!'));
    };
    res.status(200).json({
        status: 'success',
        data: null
    })
})