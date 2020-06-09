const express = require('express');

const tourController    = require('./../controllers/tourController');
const authController    = require('./../controllers/authController');
const reviewRouter      = require('./../routes/reviewRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);

router.use('/:tourId/reviews', reviewRouter);

router
    .route('/top-5-cheap')
    .get(authController.protect, tourController.aliasTopTours, tourController.getAllTours);

router
    .route('/tour-stats')
    .get(authController.protect, tourController.getTourStats);

router
    .route('/monthly-plan/:year')
    .get(authController.protect, tourController.getMonthlyPlan);

router
    .route('/')
    .get(authController.protect, tourController.getAllTours)
    .post(authController.protect, tourController.createTour);

router
    .route('/:id')
    .get(authController.protect, tourController.getTour)
    .patch(authController.protect, tourController.updateTour)
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.deleteTour
    );

module.exports = router;