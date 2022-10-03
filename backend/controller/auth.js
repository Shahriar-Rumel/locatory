const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc  Register user
//@route GET /api/auth/register
//@access Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //Create user

  const user = await User.create({
    name,
    email,
    password,
  });

  //Create token

  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});
