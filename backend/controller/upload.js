const cloudinary = require('../utils/cloudinary');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc  upload a file
//@route Post /api/upload
//@access Private
exports.uploadFile = asyncHandler(async (req, res, next) => {
  const image = req.files.image;

  const resultdata = await cloudinary.uploader.upload(
    image.tempFilePath,
    (err, result) => {
      if (err) {
        return (
          res.status('400'),
          json({
            data: err.message
          })
        );
      }
      console.log(result.url);
      return res.status(201).json({ success: true, data: result.url });
    }
  );
});
