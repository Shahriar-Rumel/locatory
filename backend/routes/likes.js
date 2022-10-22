const express = require("express");
const { getLikes, addLike, getLikeByUser } = require("../controller/likes");

const Like = require("../models/Like");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(
    protect,
    advancedResults(Like, {
      path: "review",
      select: "title",
    }),
    getLikes
  )
  .post(protect, addLike);

router.route("/user/all").get(protect, getLikeByUser);

module.exports = router;
