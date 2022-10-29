const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const Dislike = require("../models/Dislike");

// @desc      Get dislikes
// @route     GET /api/dislikes
// @route     GET /api/reviews/:reviewId/dislikes
// @access    Private
exports.getDislikes = asyncHandler(async (req, res, next) => {
  if (req.params.reviewId) {
    const dislikes = await Dislike.find({ review: req.params.reviewId });

    return res.status(200).json({
      success: true,
      count: dislikes.length,
      data: dislikes,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Add dislike
// @route     POST /api/reviews/:reviewId/dislikes
// @access    Private
exports.addDislike = asyncHandler(async (req, res, next) => {
  //Checking if user has previously disliked a review
  const dislike_temp = await Dislike.find({
    user: req.user.id,
    review: req.params.reviewId,
  });

  //if not then creating a like
  if (Object.keys(dislike_temp).length == 0) {
    req.body.review = req.params.reviewId;
    req.body.user = req.user.id;

    const review = await Review.findById(req.params.reviewId);
    //incrementing the total likes of the review
    let a = review.totaldislikes;
    if (a >= 1) review.totaldislikes = a + 1;
    review.save();

    if (!review) {
      return next(
        new ErrorResponse(`No review with the id of ${req.params.placeId}`, 404)
      );
    }

    const dislike = await Dislike.create(req.body);

    return res.status(201).json({
      success: true,
      data: dislike,
    });
  }
  //if previously disliked then removing the like
  else {
    await Dislike.findByIdAndDelete(dislike_temp[0].id);
    const review = await Review.findById(req.params.reviewId);
    let a = review.totaldislikes;
    if (a >= 1) review.totaldislikes = a - 1;
    review.save();
    return res.status(201).json({
      success: true,
      message: "dislike removed",
    });
  }
});

// @desc  Get disliked reviews by user
//@route GET /api/dislikes/user/all
//@access Private
exports.getDisLikeByUser = asyncHandler(async (req, res, next) => {
  const dislikes = await Dislike.find({
    user: req.user.id,
  });

  if (Object.keys(dislikes).length == 0) {
    return next(new ErrorResponse(`User didn't give a dislike`, 404));
  }

  res
    .status(200)
    .json({ success: true, count: dislikes.length, data: dislikes });
});
