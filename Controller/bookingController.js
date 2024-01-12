const Movie = require('./../Model/movieModel');
const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/appError');
const Booking = require('../Model/bookingModel');


// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//     const movie = await Movie.findById(req.params.MovieId);

//     if (!movie) {
//         return next(new AppError('Can not find movie with that ID!'));
//     }

//     //CREATE KHALTI INTEGRATION
//     const totalAmount = `Total amount = ${Movie.price} for ${Movie.movieName}`;
//     console.log(totalAmount);
//     const header = {
//         'Authorization': `key ${process.env.KHALTI_TEST_SECRET_KEY}`,
//         'Content-type': 'application/json'
//     }
//     console.log(header);

//     const options = {
//         return_url: '127.0.0.1:8000/api/v1/movies',
//         website_url: '127.0.0.1:8000/api/v1/movies',
//         price: Movie.price * 100,
//         purchase_order_id: booking._id,
//         purchase_order_name: req.user.fullName,
//         customer_info: {
//             'name': req.user.fullName,
//             'email': req.user.email
//         },
//     }
//     console.log(options);
//});

exports.getMyMovies = async(req, res, next) => {
    //Find all bookings
    const bookings = await Booking.find({ user: req.user.id });

    //Find movies with the returned IDs 
    const movieIDs = bookings.map(el => el.movie);
    const movies = await Movie.find({ _id: { $in: movieIDs } });

    res.status(200).json({
        status: 'success',
        data: {
            movies
        }
    })
}
