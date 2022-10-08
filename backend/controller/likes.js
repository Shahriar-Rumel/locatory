const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const Like = require("../models/Like");

// @desc      Get likes
// @route     GET /api/likes
// @route     GET /api/reviews/:reviewId/likes
// @access    Private
exports.getLikes = asyncHandler(async (req, res, next) => {
  if (req.params.reviewId) {
    const likes = await Like.find({ review: req.params.reviewId });

    return res.status(200).json({
      success: true,
      count: likes.length,
      data: likes,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Add like
// @route     POST /api/reviews/:reviewId/likes
// @access    Private
exports.addLike = asyncHandler(async (req, res, next) => {
  //Checking if user has previously liked a review
  const like_temp = await Like.find({
    user: req.user.id,
    review: req.params.reviewId,
  });

  //if not then creating a like
  if (Object.keys(like_temp).length == 0) {
    req.body.review = req.params.reviewId;
    req.body.user = req.user.id;

    const review = await Review.findById(req.params.reviewId);
    //incrementing the total likes of the review
    const a = review.totallikes;
    if (a >= 1) review.totallikes = a + 1;
    review.save();

    if (!review) {
      return next(
        new ErrorResponse(`No review with the id of ${req.params.placeId}`, 404)
      );
    }

    const like = await Like.create(req.body);

    return res.status(201).json({
      success: true,
      data: like,
    });
  }
  //if previously liked then removing the like
  else {
    await Like.findByIdAndDelete(like_temp[0].id);
    const review = await Review.findById(req.params.reviewId);
    const a = review.totallikes;
    if (a >= 1) review.totallikes = a - 1;
    review.save();
    return res.status(201).json({
      success: true,
      message: "like removed",
    });
  }
});

// @desc  Get liked reviews by user
//@route GET /api/likes/user/all
//@access Private
exports.getLikeByUser = asyncHandler(async (req, res, next) => {
  const likes = await Like.find({
    user: req.user.id,
  });

  if (Object.keys(likes).length == 0) {
    return next(new ErrorResponse(`User didn't give a like`, 404));
  }

  res.status(200).json({ success: true, count: likes.length, data: likes });
});
