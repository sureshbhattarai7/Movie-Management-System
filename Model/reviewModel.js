const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review is required!']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    movie: {
        type: mongoose.Schema.ObjectId,
        ref: 'Movie',
        required: [true, 'Review must belong to a movie!']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user!']
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


reviewSchema.pre(/^find/, function (next) {
    // this.populate({
    //     path: 'movie',
    //     select: 'movieName'
    // }).populate({
    //     path: 'user',
    //     select: 'fullName photo'
    // });

    this.populate({
        path: 'user',
        select: 'username photo'
    });
    next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;