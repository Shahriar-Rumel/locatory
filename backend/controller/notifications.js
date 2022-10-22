const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const User = require("../models/User");
const { findById } = require("../models/User");

// @desc      Get Notification
// @route     GET /api/notifications
// @route     GET /api/user/:userId/notifications
// @access    Private
exports.getNotifications = asyncHandler(async (req, res, next) => {
  const user = await User.find({
    user: req.user.id,
  });

  const notification = Object.user.notification;
  console.log(notification);
});
// @desc      Add notification
// @route     POST /api/reviews/:reviewId/notification
// @access    Private
exports.createNotification = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  //console.log(review.place.toString());
  const reviewcreator = await User.findById(review.user.toString());
  //reviewcreator.notification.place = review.place.toString();
  //reviewcreator.notification.username = req.user.name;
  //reviewcreator.save();

  reviewcreator.notification.push({
    place: review.place.toString(),
    username: req.user.name,
  });
  reviewcreator.save();
  console.log(reviewcreator.notification);
});
