const express = require("express");
const { getDislikes, addDislike } = require("../controller/dislikes");

const Dislike = require("../models/Dislike");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Dislike, {
      path: "review",
      select: "title",
    }),
    getDislikes
  )
  .post(protect, addDislike);

module.exports = router;
