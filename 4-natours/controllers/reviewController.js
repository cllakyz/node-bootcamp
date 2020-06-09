const Review        = require('./../models/reviewModel');
const APIFeatures   = require('./../utils/apiFeatures');
const catchAsync    = require('./../utils/catchAsync');
const AppError      = require('./../utils/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    // BUILD QUERY
    const features = new APIFeatures(Review.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    // EXECUTE QUERY
    const reviews = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: reviews.length,
        data: {
            reviews
        }
    });
});

exports.createReview = catchAsync(async (req, res, next) => {
    // Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;

    const newReview = await Review.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            review: newReview
        }
    });
});