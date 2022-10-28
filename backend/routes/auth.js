const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  addLocation,
  addPreference,
} = require("../controller/auth");
const {
  getNotifications,
  readNotifications,
  getNotificationAlerts,
} = require("../controller/notifications");
const router = express.Router();
const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", protect, resetPassword);
router.put("/updatedetails", protect, updateDetails);
router.post("/addlocation", protect, addLocation);
router.post("/addpreference", protect, addPreference);
router.put("/updatepassword", protect, updatePassword);
router.get("/notifications", protect, getNotifications);
router.post("/:id/markasread", protect, readNotifications);
router.get("/notifications/notificationalert", protect, getNotificationAlerts);

module.exports = router;
