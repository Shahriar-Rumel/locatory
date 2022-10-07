const express = require("express");
const { uploadFile } = require("../controller/upload");
const router = express.Router();
const { protect } = require("../middleware/auth");
router.route("/").post(protect, uploadFile);

module.exports = router;
