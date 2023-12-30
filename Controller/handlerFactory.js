const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/appError');

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            document
        }
    })
})

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
        return next(new AppError('Can not find document with that ID!', 404));
    };

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!document) {
        return next(new AppError('Can not find document with that ID!'));
    };

    res.status(200).json({
        status: 'success',
        data: {
            document
        }
    });
});

exports.getOne = Model => catchAsync(async (req, res, next) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
        return next(new AppError('Can not find document with that ID!'));
    };

    res.status(200).json({
        status: 'success',
        data: {
            document
        }
    });
});

exports.getAll = Model => catchAsync(async (req, res, next) => {
    const document = await Model.find();
    res.status(200).json({
        status: 'success',
        data: {
            document
        }
    });
});