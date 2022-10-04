const express = require("express");
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require("../controller/reviews");

const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "place",
      select: "name description",
    }),
    getReviews
  )
  .post(protect, addReview);

router
  .route("/:id")
  .get(getReview)
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
