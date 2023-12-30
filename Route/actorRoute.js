const express = require('express');
const Router = express.Router();
const actorController = require('./../Controller/actorController');
const authController = require('./../Controller/authController');

Router.route('/')
    .post(//authController.protect,
        //authController.restrictTo('admin'),
        actorController.createActor)
    .get(actorController.getActors);

Router.route('/:id')
    .get(actorController.getActor)
    .patch(authController.protect,
        authController.restrictTo('admin'),
        actorController.updateActor)
    .delete(authController.protect,
        authController.restrictTo('admin'),
        actorController.deleteActor);

module.exports = Router;