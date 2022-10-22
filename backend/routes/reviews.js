const express = require("express");
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getReviewByUser,
} = require("../controller/reviews");

const { createNotification } = require("../controller/notifications");
const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

//Include children routes
const likeRouter = require("./likes");
const dislikeRouter = require("./dislikes");

const { protect } = require("../middleware/auth");

router.use("/:reviewId/likes", likeRouter);
router.use("/:reviewId/dislikes", dislikeRouter);

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
router.route("/:id/notifications").post(protect, createNotification);

module.exports = router;
