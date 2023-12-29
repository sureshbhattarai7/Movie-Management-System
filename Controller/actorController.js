const Actor = require('./../Model/actorModel');
const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/appError');
const factory = require('./handlerFactory');


exports.createActor = catchAsync(async (req, res, next) => {
    const actor = await Actor.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            actor
        }
    });
});

exports.getActors = catchAsync(async (req, res, next) => {
    const actor = await Actor.find();
    res.status(200).json({
        status: 'success',
        totalData: actor.length,
        data: {
            actor
        }
    });
});

exports.getActor = catchAsync(async (req, res, next) => {
    const actor = await Actor.findById(req.params.id);

    if (!actor) {
        return next(new AppError(`Can not find actor with that ID!`));
    };

    res.status(200).json({
        status: 'success',
        data: {
            actor
        }
    });
});

exports.updateActor = catchAsync(async (req, res, next) => {
    const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!actor) {
        return next(new AppError(`Can not find actor with that ID!`));
    };

    res.status(200).json({
        status: 'success',
        data: {
            actor
        }
    });
});

exports.deleteActor = factory.deleteOne(Actor);