const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/appError');

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