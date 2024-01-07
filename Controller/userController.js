const multer = require('multer');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');
const User = require('./../Model/userModel');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users');
    },
    filename: (req, file, cb) => {
        const imgExtention = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${imgExtention}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! Please upload only images.', 404), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

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
    
    //Saving image name to the
    if (req.file) filteredBody.photo = req.file.filename;

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

exports.updateUser = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedUser) {
        return next(new AppError('Can not find user with that ID!'));
    };
    res.status(200).json({
        status: 'success',
        data: {
            updatedUser
        }
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new AppError('Can not find user with that ID!'));
    };
    res.status(200).json({
        status: 'success',
        data: null
    })
});