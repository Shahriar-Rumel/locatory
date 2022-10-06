const express = require("express");
const {
  getPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
  getPlaceByUser,
  getPlacesInRadius,
} = require("../controller/places");

const Place = require("../models/Place");
const advancedResults = require("../middleware/advancedResults");

//Include children routes
const reviewRouter = require("./reviews");
const router = express.Router();

const { protect } = require("../middleware/auth");

router.use("/:placeId/reviews", reviewRouter);

router.route("/radius/:zipcode/:distance").get(getPlacesInRadius);
router
  .route("/")
  .get(advancedResults(Place), getPlaces)
  .post(protect, createPlace);
router
  .route("/:id")
  .get(getPlace)
  .put(protect, updatePlace)
  .delete(protect, deletePlace);

router.route("/user/all").get(protect, getPlaceByUser);
module.exports = router;
