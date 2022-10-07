const cloudinary = require("../utils/cloudinary");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc  upload a file
//@route Post /api/upload
//@access Private
exports.uploadFile = asyncHandler(async (req, res, next) => {
  const image = req.files.image;

  const result = await cloudinary.uploader.upload(
    image.tempFilePath,
    (err, result) => {
      res.status(201).json({ success: true, data: result.url });
    }
  );
  //console.log(image);
});
