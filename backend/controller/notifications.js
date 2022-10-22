const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const User = require("../models/User");
const { findById } = require("../models/User");

// @route     GET /api/auth/notifications
// @access    Private
exports.getNotifications = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(201).json({
    success: true,
    data: user.notification,
  });
});
// @desc      Add notification
// @route     POST /api/reviews/:reviewId/notification
// @access    Private
exports.createNotification = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }
  const reviewcreator = await User.findById(review.user.toString());

  reviewcreator.notification.push({
    place: review.place.toString(),
    username: req.user.name,
  });
  reviewcreator.save();
  res.status(201).json({
    success: true,
    data: reviewcreator,
  });
});
