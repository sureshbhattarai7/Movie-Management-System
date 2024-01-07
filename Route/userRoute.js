const express = require('express');
const userController = require('./../Controller/userController');
const authController = require('./../Controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

router.patch('/updateMe', authController.protect, userController.uploadUserPhoto, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.route('/')
    .get(userController.getUsers);

router.route('/:id')
    .get(userController.getUser)
    .patch(authController.protect,
        authController.restrictTo('admin'),
        userController.updateUser)
    .delete(authController.protect,
        authController.restrictTo('admin'),
        userController.deleteUser);



module.exports = router;