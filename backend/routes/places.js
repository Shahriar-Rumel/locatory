const express = require("express");
const {
  getPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controller/places");
const router = express.Router();

router.route("/").get(getPlaces).post(createPlace);
router.route("/:id").get(getPlace).put(updatePlace).delete(deletePlace);
module.exports = router;
