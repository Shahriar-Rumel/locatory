const express = require("express");
const {
  getPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controller/places");
const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/").get(getPlaces).post(protect, createPlace);
router
  .route("/:id")
  .get(getPlace)
  .put(protect, updatePlace)
  .delete(protect, deletePlace);
module.exports = router;
