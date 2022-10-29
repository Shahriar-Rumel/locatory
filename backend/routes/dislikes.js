const express = require("express");
const {
  getDislikes,
  addDislike,
  getDisLikeByUser,
} = require("../controller/dislikes");

const Dislike = require("../models/Dislike");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(
    protect,
    advancedResults(Dislike, {
      path: "review",
      select: "title",
    }),
    getDislikes
  )
  .post(protect, addDislike);

router.route("/user/all").get(protect, getDisLikeByUser);

module.exports = router;
