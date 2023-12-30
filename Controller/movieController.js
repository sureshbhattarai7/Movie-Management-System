const Movie = require("./../Model/movieModel");
const catchAsync = require('./../Utils/catchAsync');
const AppError = require("./../Utils/appError");
const factory = require('./handlerFactory');


exports.deleteMovie = factory.deleteOne(Movie);
exports.updateMovie = factory.updateOne(Movie);
exports.createMovie = factory.createOne(Movie);
exports.getMovie = factory.getOne(Movie);
exports.getMovies = factory.getAll(Movie);

// exports.createMovie = catchAsync(async (req, res, next) => {
//     const movie = await Movie.create(req.body);
//     res.status(200).json({
//         status: "success",
//         data: {
//             movie,
//         },
//     });
// });

// exports.getMovies = catchAsync(async (req, res, next) => {
//     const movies = await Movie.find().populate('actors').populate('reviews');

//     res.status(200).json({
//         status: "success",
//         length: movies.length,
//         data: {
//             movies,
//         },
//     });
// });

// exports.getMovie = catchAsync(async (req, res, next) => {
//     const movie = await Movie.findById(req.params.id).populate('actors').populate('reviews');

//     if (!movie) {
//         return next(new AppError(`No movie found with that ID`, 404));
//     }

//     res.status(200).json({
//         status: "success",
//         data: {
//             movie,
//         },
//     });

// });

// exports.updateMovie = catchAsync(async (req, res, next) => {
//     const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//     });

//     if (!movie) {
//         return next(new AppError(`No movie found with that ID`, 404));
//     }

//     res.status(200).json({
//         status: "success",
//         data: {
//             movie,
//         },
//     });

// });

// exports.deleteMovie = catchAsync(async (req, res, next) => {
//     const movie = await Movie.findByIdAndDelete(req.params.id);

//     if (!movie) {
//         return next(new AppError(`No movie found with that ID`, 404));
//     }
 
//     res.status(200).json({
//         status: "success",
//         data: null,
//     });

// });
