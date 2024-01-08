const multer = require('multer');
const sharp = require('sharp');
const Movie = require("./../Model/movieModel");
const catchAsync = require('./../Utils/catchAsync');
const AppError = require("./../Utils/appError");

// exports.deleteMovie = factory.deleteOne(Movie);
// exports.updateMovie = factory.updateOne(Movie);
// exports.createMovie = factory.createOne(Movie);
// exports.getMovie = factory.getOne(Movie);
// exports.getMovies = factory.getAll(Movie);

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadMovieImages = upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 3 }
]);

//upload.single('images') req.file
//upload.array('images', 5) req.files

exports.resizeMovieImages = (req, res, next) => {
    console.log(req.files);
    next();
}

exports.createMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            movie,
        },
    });
});

exports.getMovies = catchAsync(async (req, res, next) => {
    const movies = await Movie.find().populate('actors').populate('reviews');

    res.status(200).json({
        status: "success",
        length: movies.length,
        data: {
            movies,
        },
    });
});

exports.getMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id).populate('actors').populate('reviews');

    if (!movie) {
        return next(new AppError(`No movie found with that ID`, 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            movie,
        },
    });

});

exports.updateMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    }).populate('actors').populate('reviews');

    if (!movie) {
        return next(new AppError(`No movie found with that ID`, 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            movie,
        },
    });

});

exports.deleteMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
        return next(new AppError(`No movie found with that ID`, 404));
    }
 
    res.status(200).json({
        status: "success",
        data: null,
    });

});
