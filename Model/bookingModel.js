const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.ObjectId,
        ref: 'Movie',
        required: [true, 'Booking must belong to a movie!']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to user!']
    },
    price: {
        type: Number,
        required: [true, 'Booking must have a price!']
    },
    seatNo: {
        type: String,
        unique: true,
        required:[true, 'Seat number for user is not found!']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    showTime: {
        type: String,
        required: [true, 'Show time is needed!']
    },
    bookingDate: {
        type: String,
        required: [true, 'Booking date is required!']
    },
    paid: {
        type: Boolean,
        default: true
    },
    transactionId: {
        type: String,
        required: [true, 'Transaction ID is required!']
    }
});

bookingSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'User',
        select: 'fullName username email'
    }).populate({
        path: 'Movie',
        select: 'movieName -_id'
    });
    next();
})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;