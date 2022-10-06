const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const Place = require("../models/Place");

// @desc      Get reviews
// @route     GET /api/reviews
// @route     GET /api/places/:placeId/reviews
// @access    Private
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.placeId) {
    const reviews = await Review.find({ place: req.params.placeId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single review
// @route     GET /api/reviews/:id
// @access    Private
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "place",
    select: "name",
  });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc      Add review
// @route     POST /api/places/:placeId/reviews
// @access    Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.place = req.params.placeId;
  req.body.user = req.user.id;

  const place = await Place.findById(req.params.placeId);

  if (!place) {
    return next(
      new ErrorResponse(`No place with the id of ${req.params.placeId}`, 404)
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc      Update review
// @route     PUT /api/reviews/:id
// @access    Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user
  if (review.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update review`, 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc      Delete review
// @route     DELETE /api/reviews/:id
// @access    Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user
  if (review.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to delete review`, 401));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc  Get reviews by user
//@route GET /api/reviews/user/all
//@access Private
exports.getReviewByUser = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({
    user: req.user.id,
  });

  if (!reviews) {
    return next(new ErrorResponse(`User didn't create a review`, 404));
  }

  res.status(200).json({ success: true, count: reviews.length, data: reviews });
});
