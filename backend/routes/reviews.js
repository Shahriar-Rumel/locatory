const express = require("express");
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getReviewByUser,
} = require("../controller/reviews");

const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

//Include children routes
const likeRouter = require("./likes");

const { protect } = require("../middleware/auth");

router.use("/:reviewId/likes", likeRouter);

router
  .route("/")
  .get(
    protect,
    advancedResults(Review, {
      path: "place",
      select: "name",
    }),
    getReviews
  )
  .post(protect, addReview);

router
  .route("/:id")
  .get(protect, getReview)
  .put(protect, updateReview)
  .delete(protect, deleteReview);

router.route("/user/all").get(protect, getReviewByUser);

module.exports = router;
