const Place = require("../models/Place");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc  Get all places
//@route GET /api/places
//@access Public
exports.getPlaces = asyncHandler(async (req, res, next) => {
  const places = await Place.find();
  res.status(200).json({ success: true, count: places.length, data: places });
});

// @desc  Get a place
//@route GET /api/places/:id
//@access Public
exports.getPlace = asyncHandler(async (req, res, next) => {
  const place = await Place.findById(req.params.id);

  if (!place) {
    return next(
      new ErrorResponse(`Place not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: place });
});

// @desc  Create a place
//@route Post /api/places
//@access Private
exports.createPlace = asyncHandler(async (req, res, next) => {
  //Add user to req,body
  req.body.user = req.user.id;
  const place = await Place.create(req.body);

  res.status(201).json({ success: true, data: place });
});

// @desc  Update a place
//@route Put /api/places/:id
//@access Private
exports.updatePlace = asyncHandler(async (req, res, next) => {
  let place = await Place.findById(req.params.id);
  if (!place) {
    return next(
      new ErrorResponse(`Place not found with id of ${req.params.id}`, 404)
    );
  }

  //Make sure user is the post creator
  if (place.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this place`,
        401
      )
    );
  }

  place = await Place.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: place });
});

// @desc  Delete a place
//@route Delete /api/places/:id
//@access Private
exports.deletePlace = asyncHandler(async (req, res, next) => {
  const place = await Place.findById(req.params.id);
  if (!place) {
    return next(
      new ErrorResponse(`Place not found with id of ${req.params.id}`, 404)
    );
  }
  //Make sure user is the post creator
  if (place.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this place`,
        401
      )
    );
  }
  place.remove();
  res
    .status(200)
    .json({ success: true, data: {}, msg: `deleted successfully` });
});
