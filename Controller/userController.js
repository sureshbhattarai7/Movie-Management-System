const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');
const User = require('./../Model/userModel');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

exports.getUsers = catchAsync(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: 'success',
        totalUsers: users.length,
        data: {
            users
        }
    })
});

exports.getUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
});

exports.updateMe = catchAsync(async (req, res, next) => {
    //Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError(`This route is not for password update. Please use '/updateMyPassword'.`, 400));
    }

    //Filtered out unwanted field names that are not allowed to be updated.
    const filteredBody = filterObj(req.body, 'fullName', 'username');

    //Update User documents
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        data: {
            updatedUser
        }
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);