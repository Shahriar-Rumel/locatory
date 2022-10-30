const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const User = require("../models/User");
const { findById } = require("../models/User");
const Place = require("../models/Place");

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
  const place_temp = await Place.findById(review.place.toString());
  reviewcreator.notification.push({
    place: review.place.toString(),
    placename: place_temp.name,
    reviewid: req.params.id,
    username: req.user.name,
    userphoto: req.user.photo,
  });
  reviewcreator.save();
  res.status(201).json({
    success: true,
    data: reviewcreator,
  });
});

// @route     GET /api/auth/notificationId/markasread
// @access    Private
exports.readNotifications = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  for (let i = 0; i < user.notification.length; i++) {
    if (user.notification[i].id === req.params.id) {
      user.notification[i].read = true;
      user.save();
      res.status(201).json({
        success: true,
        data: user,
      });
    } else {
      new ErrorResponse(`No notification with the id of ${req.params.id}`, 404);
    }
  }
});

// @route     GET /api/auth/notification/notificationalert
// @access    Private
exports.getNotificationAlerts = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  let a = 0;
  for (let i = 0; i < user.notification.length; i++) {
    if (user.notification[i].read === false) {
      a = a + 1;
    }
  }
  if (a > 0) {
    res.status(201).json({
      success: true,
      data: a,
    });
  } else {
    res.status(201).json({
      success: true,
      data: false,
    });
  }
});
